import random
import string
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from account.models import UserAccount
from schedule.models import Subcity, Tabya
from report.models import ResidentWasteReport

class Command(BaseCommand):
    help = "Generate between 80 and 150 ResidentWasteReports for each Tabya with metric tons of 6, 7, or 8."

    def add_arguments(self, parser):
        parser.add_argument('union_id', type=int, help="ID of the Union user.")
        parser.add_argument('data_encoder_id', type=int, help="ID of the Data Encoder user.")
        parser.add_argument('sub_city_name', type=str, help="Name of the Subcity.")

    def handle(self, *args, **options):
        union_id = options['union_id']
        data_encoder_id = options['data_encoder_id']
        sub_city_name = options['sub_city_name']

        # Retrieve the Union and Data Encoder user accounts
        try:
            union_user = UserAccount.objects.get(id=union_id, role='UNION')
            data_encoder = UserAccount.objects.get(id=data_encoder_id, role='DATA_ENCODER')
        except UserAccount.DoesNotExist:
            self.stdout.write(self.style.ERROR("Invalid Union or Data Encoder ID."))
            return

        # Retrieve the specified Subcity
        try:
            sub_city = Subcity.objects.get(name=sub_city_name)
        except Subcity.DoesNotExist:
            self.stdout.write(self.style.ERROR("Subcity not found."))
            return

        # Retrieve all Tabyas within the Subcity
        tabyas = Tabya.objects.filter(subcity=sub_city)

        for tabya in tabyas:
            # Random number of reports between 80 and 150 for each Tabya
            report_count = random.randint(80, 150)
            
            for _ in range(report_count):
                # Generate random values for truck_number and metric_ton
                truck_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                metric_ton = random.choice([6, 7, 8])  # Randomly select between 6, 7, or 8 metric tons
                description = f"Auto-generated report for {tabya.name}"

                # Generate a random date within the past 30 days
                random_days_ago = random.randint(0, 29)
                report_date = timezone.now() - timedelta(days=random_days_ago)

                # Create and save the report
                ResidentWasteReport.objects.create(
                    truck_number=truck_number,
                    receiver_data_encoder=data_encoder,
                    delivering_union=union_user,
                    metric_ton=metric_ton,
                    description=description,
                    sub_city=sub_city,
                    tabya=tabya,
                    date=report_date  # Use the random report date
                )

            self.stdout.write(self.style.SUCCESS(f"Created {report_count} reports for Tabya {tabya.name}"))

        self.stdout.write(self.style.SUCCESS(f"Successfully generated reports for each Tabya in {sub_city_name}."))
