from django.contrib import admin
from .models import Department, Student
from django.utils.html import format_html


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
	list_display = ("name", "created_at")
	search_fields = ("name",)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = ("photo_thumbnail", "name", "email", "department", "marks", "joined_date")
	list_filter = ("department", "joined_date")
	search_fields = ("name", "email")
	ordering = ("-joined_date", "name")
	readonly_fields = ("photo_thumbnail",)

	def photo_thumbnail(self, obj):
		if obj.photo:
			return format_html('<img src="{}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;"/>', obj.photo.url)
		return "-"

	photo_thumbnail.short_description = "Photo"
