from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Permission
from schedule.models import Tabya, Subcity



class UserAccountManager(BaseUserManager):
  def create_user(self, email, role, image, password=None, **extra_fields):
    if not email:
      raise ValueError('email must be provided')
    email = self.normalize_email(email)
    user = self.model(email=email, role=role, image=image,  **extra_fields)
    user.set_password(password)
    user.save()
    if role == UserAccount.Role.ADMIN:
      permission = Permission.objects.get(codename='can_create_users')
      user.user_permissions.add(permission)
    return user
  
  def create_superuser(self, email, role, image, status, password=None, **extra_fields):
    user = self.create_user(email, role, image, status, password, **extra_fields)
    user.is_active = True
    user.is_superuser = True
    user.is_staff = True
    user.save()
    return user 


class UserAccount(AbstractBaseUser, PermissionsMixin):
  class Meta:
    verbose_name = 'User Account'
    verbose_name_plural = 'User Accounts'
    ordering = ['-date_joined']
    permissions = [
        ('can_create_users', 'Can create users'),
    ]

  class Role(models.TextChoices):
    RESIDENT = 'RESIDENT', 'resident' 
    ADMIN = 'ADMIN', 'admin' 
    CITY = 'CITY', 'city'
    SUB_CITY = 'SUB_CITY', 'sub_city'
    TABYA = 'TABYA', 'tabya'
    DATA_ENCODER = 'DATA_ENCODER', 'data_encoder'
    UNION = 'UNION', 'union'

  class State(models.TextChoices):
    PENDING = 'PENDING', 'pending'
    ACTIVE = 'ACTIVE', 'active'

  
  email = models.EmailField(max_length=255, unique=True)
  full_name = models.CharField(max_length=250, null=True)
  role = models.CharField(max_length=15, choices=Role.choices)
  image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
  status = models.CharField(max_length=10, choices=State.choices, default=State.PENDING)
  date_joined = models.DateTimeField(auto_now_add=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  objects = UserAccountManager()
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['role']

  def __str__(self):
    return self.email


class UnionProfile(models.Model):

  user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
  union_name = models.CharField(max_length=250, unique=True)
  bid_amount = models.IntegerField()
  phone_number = models.CharField(max_length=250)
  sub_city = models.ForeignKey(Subcity, on_delete=models.CASCADE) 

 



class ResidentProfile(models.Model):

   user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
   sub_city = models.ForeignKey(Subcity, on_delete=models.CASCADE) 
   tabya = models.ForeignKey(Tabya, on_delete=models.CASCADE) 
   
   def save(self, *args, **kwargs):
      # Ensure the selected tabya belongs to the selected sub_city
      if self.sub_city and self.tabya:
          if self.tabya.subcity != self.sub_city:  # Check if the tabya is associated with the selected sub_city
              raise ValueError(f"The selected tabya '{self.tabya.name}' is not valid for the sub_city '{self.sub_city.name}'")
      super().save(*args, **kwargs)





class SubCityProfile(models.Model):
  class SubCity(models.TextChoices):
    semen = 'semen'
    hawelti = 'hawelti'
    ayder = 'ayder'
    adi_haki = 'adi_haki'
    kedemay_woyane = 'kedemay_woyane'
    hadnet = 'hadnet'
    kuiha = 'kuiha'

  user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
  phone_number = models.CharField(max_length=250)
  sub_city = models.ForeignKey(Subcity, on_delete=models.CASCADE) 



class TabyaProfile(models.Model):

  user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
  phone_number = models.CharField(max_length=250)
  sub_city = models.ForeignKey(Subcity, on_delete=models.CASCADE)  # Change to ForeignKey
  tabya = models.ForeignKey(Tabya, on_delete=models.CASCADE) 
   
  def save(self, *args, **kwargs):
      # Ensure the selected tabya belongs to the selected sub_city
      if self.sub_city and self.tabya:
          if self.tabya.subcity != self.sub_city:  # Check if the tabya is associated with the selected sub_city
              raise ValueError(f"The selected tabya '{self.tabya.name}' is not valid for the sub_city '{self.sub_city.name}'")
      super().save(*args, **kwargs)



class OfficialProfile(models.Model):

  user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
  phone_number = models.CharField(max_length=250)



