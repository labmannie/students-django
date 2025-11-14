# Student Dashboard — National Institute of Engineering

![Institute Logo](student_dashboard/student/static/student/img/institute_logo.png)

A polished, dark-mode student dashboard built with Django. It displays students, their departments, photos and additional profile details in a modern liquid-glass UI with smooth animations, modal detail views, and flexible search/filter/sort behaviour.

Made by: Lab MAN NIE

License: MIT

---

## Features

- Student model with: name, email, department (FK), marks, joined_date, photo, bio, instagram handle, website.
- Department model and admin listing.
- Beautiful Apple-inspired dark theme with glass cards, responsive grid and animated CTA hero.
- Client-side and server-side search, department filtering and sorting (name, marks, joined date).
- Modal detail view with large photo, bio and clickable social links.
- Django admin integration for easy data management.

## Project structure (key files)

- `student_dashboard/` — Django project
  - `settings.py` — project settings (MEDIA_URL/ROOT configured)
  - `urls.py` — project routing
- `student/` — Django app
  - `models.py` — `Student`, `Department` models
  - `admin.py` — admin registration and photo thumbnail
  - `views.py` — `home` and `student_list` views
  - `templates/student/` — `home.html`, `student_list.html`
  - `static/student/` — CSS, JS, and images (logo)

## Quick start (development)

1. Create & activate a Python virtual environment (recommended):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies (use your virtual environment):

```powershell
pip install -r requirements.txt
```

> Note: This project uses Django and Pillow for ImageField support. If `requirements.txt` is missing, install at minimum:
> ```powershell
> pip install django pillow
> ```

3. Apply migrations and run the development server:

```powershell
python .\student_dashboard\manage.py migrate
python .\student_dashboard\manage.py runserver
```

4. Open the site:

- Home (hero): http://127.0.0.1:8000/
- Students list: http://127.0.0.1:8000/students/
- Admin: http://127.0.0.1:8000/admin/ (create superuser with `createsuperuser`)

## Media and static files

- Uploaded photos are stored under `media/student_photos/` (configured via `MEDIA_ROOT`).
- SDK/Static images (logo) are stored in `student/static/student/img/`.
- To add the institute logo used in the hero and card banner, place the PNG at:

```
student/static/student/img/institute_logo.png
```

A transparent PNG (512×512) is recommended; the CSS scales it for display.

## Admin & Data

- Add departments and students through Django admin. Students include photo upload (Pillow required).
- Admin shows a small thumbnail in the list view.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Commit changes and push.
4. Create a Pull Request describing your work.

## License

This project is released under the MIT License.

---

MIT License

Copyright (c) 2025 Lab MAN NIE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
