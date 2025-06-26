from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Profile(models.Model):
    SEX_CHOICES = [
        ('Female', 'Kobieta'),
        ('Male', 'Mężczyzna'),
        ('Other', 'Inne'),
        ('Unknown', 'Wolę nie podawać'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)

    def __str__(self):
        return self.user.email

class LetterStatistic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    letter = models.CharField(max_length=5)
    correct_count = models.IntegerField(default=0)
    incorrect_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'letter')

    def __str__(self):
        return f"{self.user.username} - {self.letter}: {self.correct_count}/{self.incorrect_count}"