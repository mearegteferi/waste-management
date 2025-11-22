from django.db import models
from django.core.exceptions import ValidationError

# Constants for collection times
MORNING = 'M'
AFTERNOON = 'A'
NO_COLLECTION = 'N'
COLLECTION_TIMES = [
    (MORNING, 'Morning'),
    (AFTERNOON, 'Afternoon'),
    (NO_COLLECTION, 'No Collection')
]

# Days of the week (excluding Sunday)
DAYS_OF_WEEK = [
    ('Mon', 'Monday'),
    ('Tue', 'Tuesday'),
    ('Wed', 'Wednesday'),
    ('Thu', 'Thursday'),
    ('Fri', 'Friday'),
    ('Sat', 'Saturday'),
]


class Subcity(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tabya(models.Model):
    subcity = models.ForeignKey(Subcity, related_name='tabyas', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} (Priority {self.priority}) in {self.subcity.name}"


class SubcityWasteCollectionSchedule(models.Model):
    subcity = models.OneToOneField(Subcity, related_name='waste_collection_schedule', on_delete=models.CASCADE)

    # Each day of the week will have fields for morning and afternoon collection per Tabya
    monday_morning = models.ManyToManyField(Tabya, related_name='monday_morning_collections', blank=True)
    monday_afternoon = models.ManyToManyField(Tabya, related_name='monday_afternoon_collections', blank=True)

    tuesday_morning = models.ManyToManyField(Tabya, related_name='tuesday_morning_collections', blank=True)
    tuesday_afternoon = models.ManyToManyField(Tabya, related_name='tuesday_afternoon_collections', blank=True)

    wednesday_morning = models.ManyToManyField(Tabya, related_name='wednesday_morning_collections', blank=True)
    wednesday_afternoon = models.ManyToManyField(Tabya, related_name='wednesday_afternoon_collections', blank=True)

    thursday_morning = models.ManyToManyField(Tabya, related_name='thursday_morning_collections', blank=True)
    thursday_afternoon = models.ManyToManyField(Tabya, related_name='thursday_afternoon_collections', blank=True)

    friday_morning = models.ManyToManyField(Tabya, related_name='friday_morning_collections', blank=True)
    friday_afternoon = models.ManyToManyField(Tabya, related_name='friday_afternoon_collections', blank=True)

    saturday_morning = models.ManyToManyField(Tabya, related_name='saturday_morning_collections', blank=True)
    saturday_afternoon = models.ManyToManyField(Tabya, related_name='saturday_afternoon_collections', blank=True)


    def __str__(self):
        return f"Waste Collection Schedule for {self.subcity.name}"
