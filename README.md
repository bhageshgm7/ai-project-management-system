# AI Project Management System

A full-stack project management application built with **Django REST Framework** and **React**, with **JWT authentication**, **role-based access control**, **PostgreSQL**, and an **AI-powered project assistant**.

## 🚀 Live Demo

**Frontend:**
https://ai-project-management-system-1.onrender.com

**Backend API:**
https://ai-project-management-system-kwco.onrender.com

---

## 📌 Features

* 🔐 JWT-based authentication
* 👤 User registration and login
* 🛡️ Role-based access control
* 📁 Project management
* ✅ Task management
* 📊 Project dashboard
* 🤖 AI Project Assistant
* 🔎 Search and filtering
* 📱 Responsive design
* 🌙 Dark Glass UI
* 🗄️ PostgreSQL database
* ☁️ Render deployment
* 🔄 RESTful API architecture

---

## 👥 User Roles

### Admin

* Manage users
* View projects and tasks
* Delete projects and tasks
* Full system access

### Manager

* Create projects
* Update projects
* Manage tasks
* Assign tasks to team members

### Member

* View assigned projects
* View assigned tasks
* Work with tasks assigned to them

---

## 🛠️ Technology Stack

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* Axios
* React Router
* Vite

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* django-filter

### Database

* PostgreSQL
* SQLite for local development

### AI

* Ollama / AI Project Assistant

### Deployment

* Render
* GitHub

---

## 🏗️ Project Structure

```text
AI Project Management System
│
├── accounts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── projects/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── tasks/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── ai_assistant/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
├── manage.py
├── requirements.txt
├── build.sh
└── README.md
```

---

## 🔑 Authentication

The application uses **JWT authentication**.

Users can:

1. Create an account
2. Log in using their username and password
3. Receive an access token and refresh token
4. Access protected API endpoints
5. Use role-based permissions

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/register/
POST /api/token/
POST /api/token/refresh/
```

### Projects

```text
GET    /api/projects/
POST   /api/projects/
GET    /api/projects/<id>/
PUT    /api/projects/<id>/
PATCH  /api/projects/<id>/
DELETE /api/projects/<id>/
```

### Tasks

```text
GET    /api/tasks/
POST   /api/tasks/
GET    /api/tasks/<id>/
PUT    /api/tasks/<id>/
PATCH  /api/tasks/<id>/
DELETE /api/tasks/<id>/
```

### AI Assistant

```text
/api/ai/
```

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/bhageshgm7/ai-project-management-system.git
cd ai-project-management-system
```

### 2. Create and activate virtual environment

Windows:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. Start Django backend

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

### 6. Start React frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

---

## 🗄️ Database Configuration

Local development uses SQLite by default.

Production uses PostgreSQL through the `DATABASE_URL` environment variable.

The application uses `dj-database-url` to configure the database connection.

---

## ☁️ Deployment

The application is deployed using **Render**.

### Frontend

React/Vite frontend is deployed as a Render Static Site.

### Backend

Django REST API is deployed as a Render Web Service using Gunicorn.

### Database

PostgreSQL is hosted on Render.

---

## 🤖 AI Project Assistant

The project includes an AI assistant designed to help with project-management related tasks such as:

* Project planning
* Task suggestions
* Workflow assistance
* Project-related questions

The AI layer is designed separately from the core project and task management functionality.

---

## 🎨 UI

The application uses a modern **Dark Glass UI** with:

* Glassmorphism cards
* Dark theme
* Responsive layouts
* Clean navigation
* Interactive forms
* Dashboard-based workflow

---

## 🔒 Security

The application includes:

* JWT authentication
* Protected API endpoints
* Role-based permissions
* Password hashing through Django authentication
* CORS configuration
* Environment-based production secrets

---

## 📈 Future Improvements

Possible future enhancements include:

* Email notifications
* Advanced project analytics
* File attachments
* Real-time notifications
* Team chat
* Hosted AI API integration
* Advanced reporting

---

## 👨‍💻 Author

**Jesta dl**

BE – Electronics and Communication Engineering

---

## ⭐ Project Highlights

This project demonstrates practical experience with:

**Python + Django + REST API + React + JWT + PostgreSQL + AI + Deployment**

It was developed as a full-stack portfolio project to demonstrate modern web development and AI integration.
