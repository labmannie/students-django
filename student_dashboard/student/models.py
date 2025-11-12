from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone


class Department(models.Model):
	name = models.CharField(max_length=100, unique=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Department"
		verbose_name_plural = "Departments"
		ordering = ["name"]

	def __str__(self) -> str:
		return self.name


class Student(models.Model):
	name = models.CharField(max_length=150)
	email = models.EmailField(unique=True)
	department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="students")
	marks = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
	joined_date = models.DateField(default=timezone.now)
	photo = models.ImageField(upload_to="student_photos/", blank=True, null=True)
	# additional profile fields
	bio = models.TextField(blank=True, default="")
	instagram = models.CharField(max_length=100, blank=True, default="")
	website = models.URLField(blank=True, default="")

	class Meta:
		verbose_name = "Student"
		verbose_name_plural = "Students"
		ordering = ["-joined_date", "name"]

	def __str__(self) -> str:
		return f"{self.name} <{self.email}>"

	def clean(self):
		# additional model-level validation (optional)
		super().clean()
		if self.marks is not None and (self.marks < 0 or self.marks > 100):
			raise ValidationError({"marks": "Marks must be between 0 and 100."})

