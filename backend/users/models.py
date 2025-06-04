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
