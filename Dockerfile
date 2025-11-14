# Dockerfile for running the Django project
# Uses gunicorn to serve the Django WSGI app

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# system deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# copy and install requirements
COPY requirements.txt /app/
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# copy app
COPY . /app/

# collect static files
ENV DJANGO_SETTINGS_MODULE=student_dashboard.settings
RUN python -m pip install --upgrade pip
RUN python ./student_dashboard/manage.py collectstatic --noinput || true

# expose port
EXPOSE 8000

# command for gunicorn; Vercel will provide PORT env var, fallback to 8000
CMD exec gunicorn student_dashboard.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3 --log-level info
