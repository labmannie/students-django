from django.shortcuts import render
from .models import Student, Department
from django.db.models import Q


def student_list(request):
	qs = Student.objects.select_related('department').all()

	# search
	q = request.GET.get('q', '').strip()
	if q:
		qs = qs.filter(Q(name__icontains=q) | Q(email__icontains=q) | Q(instagram__icontains=q))

	# department filter
	dept = request.GET.get('dept')
	if dept:
		qs = qs.filter(department__id=dept)

	# sorting
	sort = request.GET.get('sort')
	if sort == 'name':
		qs = qs.order_by('name')
	elif sort == 'marks':
		qs = qs.order_by('-marks')
	else:
		qs = qs.order_by('-joined_date')

	departments = Department.objects.order_by('name')

	return render(request, 'student/student_list.html', {'students': qs, 'departments': departments, 'q': q, 'current_dept': dept, 'sort': sort})


def home(request):
	# simple homepage/hero that links to the students listing
	return render(request, 'student/home.html')
