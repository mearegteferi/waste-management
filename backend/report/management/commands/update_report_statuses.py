# myapp/management/commands/update_report_statuses.py

import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from report.models import ResidentWasteReport  # Replace 'myapp' with the actual app name

class Command(BaseCommand):
    help = "Randomly updates the statuses of ResidentWasteReport instances with a low chance of rejection"

    def handle(self, *args, **kwargs):
        # Define weighted choices for status, making "rejected" rare
        status_choices = ["approved", "pending", "rejected"]
        status_weights = [0.85, 0.1, 0.05]  # 5% chance for "rejected"

        # Fetch all reports to update their statuses
        reports = ResidentWasteReport.objects.all()

        for report in reports:
            # Update Tabya approval status first
            report.tabya_approval_status = random.choices(status_choices, weights=status_weights, k=1)[0]

            # If Tabya rejected, set report status to rejected and skip further checks
            if report.tabya_approval_status == "rejected":
                report.report_status = "rejected"
            else:
                # If Tabya approved, proceed to Union approval
                report.union_approval_status = random.choices(status_choices, weights=status_weights, k=1)[0]
                
                # If Union rejected, set report status to rejected and skip further checks
                if report.union_approval_status == "rejected":
                    report.report_status = "rejected"
                else:
                    # If Union approved, proceed to City approval
                    report.city_approval_status = random.choices(status_choices, weights=status_weights, k=1)[0]

                    # Set the final report status based on all approvals
                    if report.city_approval_status == "rejected":
                        report.report_status = "rejected"
                    elif all(status == "approved" for status in [
                        report.tabya_approval_status,
                        report.union_approval_status,
                        report.city_approval_status
                    ]):
                        report.report_status = "approved"
                    else:
                        report.report_status = "pending"

            # Update approval dates only if the status is approved and no date exists
            if report.tabya_approval_status == "approved" and not report.tabya_approval_date:
                report.tabya_approval_date = timezone.now()
            if report.union_approval_status == "approved" and not report.union_approval_date:
                report.union_approval_date = timezone.now()
            if report.city_approval_status == "approved" and not report.city_approval_date:
                report.city_approval_date = timezone.now()

            # Save the changes for the report
            report.save()

        self.stdout.write(self.style.SUCCESS("Successfully updated report statuses with sequential approvals."))
