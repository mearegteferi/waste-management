import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from schedule.models import SubcityWasteCollectionSchedule, Tabya, Subcity
from report.models import ResidentWasteReport
from django.db.models import Sum
from django.db.models.functions import TruncDate
from datetime import timedelta

class Command(BaseCommand):
    help = 'Generate weekly waste collection schedule based on historical waste data'

    def handle(self, *args, **kwargs):
        # Step 1: Delete all existing schedules
        SubcityWasteCollectionSchedule.objects.all().delete()
        self.stdout.write(self.style.WARNING('All existing schedules have been deleted.'))

        subcities = Subcity.objects.all()
        self.stdout.write(self.style.NOTICE(f"Processing {subcities.count()} subcities..."))

        for subcity in subcities:
            self.stdout.write(self.style.NOTICE(f"Generating schedule for subcity: {subcity.name}"))

            now = timezone.now()
            today = now.date()
            start_date = today - timedelta(days=30)

            # Use timezone-aware datetimes for filtering
            waste_reports = ResidentWasteReport.objects.filter(
                tabya__subcity=subcity,
                date__range=[
                    timezone.make_aware(timezone.datetime.combine(start_date, timezone.datetime.min.time())),
                    timezone.make_aware(timezone.datetime.combine(today, timezone.datetime.max.time()))
                ]
            ).annotate(report_date=TruncDate('date')).values('tabya').annotate(total_waste=Sum('metric_ton'))

            if not waste_reports:
                self.stdout.write(self.style.WARNING(f"No waste reports found for {subcity.name} in the past 30 days."))
                continue  # Skip to the next subcity if no reports are found

            # Create a new schedule for the subcity
            schedule = SubcityWasteCollectionSchedule.objects.create(subcity=subcity)
            self.stdout.write(self.style.NOTICE(f"Created new schedule for {subcity.name}"))

            # Available time slots
            all_time_slots = [
                'monday_morning', 'monday_afternoon',
                'tuesday_morning', 'tuesday_afternoon',
                'wednesday_morning', 'wednesday_afternoon',
                'thursday_morning', 'thursday_afternoon',
                'friday_morning', 'friday_afternoon',
                'saturday_morning', 'saturday_afternoon'
            ]

            # Calculate average waste for each tabya
            average_waste_list = []
            for report in waste_reports:
                tabya_id = report['tabya']
                total_waste = report['total_waste']
                tabya = Tabya.objects.get(id=tabya_id)

                average_waste = total_waste / 30
                average_waste_list.append((tabya, average_waste))

            # Sort the tabyas based on average waste in descending order
            average_waste_list.sort(key=lambda x: x[1], reverse=True)

            # Assign time slots based on their ranking
            for rank, (tabya, average_waste) in enumerate(average_waste_list):
                if rank < 2:
                    frequency = 3  # Top 2 Tabya (3 time slots)
                else:
                    frequency = 2  # Other Tabya (2 time slots)

                self.stdout.write(self.style.NOTICE(f"Assigning {frequency} time slots for {tabya.name}"))

                # Randomly select unique time slots based on frequency
                selected_slots = random.sample(all_time_slots, frequency)
                
                # Assign slots to the tabya and remove from all_time_slots to avoid reusing
                for slot in selected_slots:
                    self.stdout.write(self.style.NOTICE(f"Adding {tabya.name} to {slot}"))
                    getattr(schedule, slot).add(tabya)
                    all_time_slots.remove(slot)  # Ensure slot is not reused

            # Save the created schedule instance
            schedule.save()
            self.stdout.write(self.style.SUCCESS(f"Saved schedule for {subcity.name}"))

        self.stdout.write(self.style.SUCCESS('Successfully generated the weekly waste collection schedule.'))
