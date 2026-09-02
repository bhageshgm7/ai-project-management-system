# AI Project Management System

A full-stack project management application built with **Django REST Framework** and **React**, featuring JWT authentication, role-based access control, and an integrated AI assistant powered by Ollama.

The system allows users to manage projects and tasks through a clean, responsive dashboard while providing AI-assisted project management capabilities.

## Features

* User registration and login
* JWT-based authentication
* Role-based access control
* Admin, Manager, and Member roles
* Automatic MEMBER role for newly registered users
* Role-based project and task visibility
* Project management
* Task management
* Task priority and status tracking
* Protected frontend routes
* AI Assistant powered by Ollama
* RESTful APIs using Django REST Framework
* Responsive React frontend
* Dark Glass UI design
* SQLite database for development

## User Roles

The system supports three user roles:

### ADMIN

* Administrative access
* View all projects and tasks
* Delete projects and tasks

### MANAGER

* View projects they manage
* View tasks belonging to their projects
* Create and update projects and tasks

### MEMBER

* View tasks assigned to them
* View projects related to their assigned tasks

New users registering through the public registration page are automatically assigned the **MEMBER** role.

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* django-filter
* SQLite

### Frontend

* React
* React Router
* JavaScript
* HTML
* CSS
* Vite

### AI

* Ollama
* Local AI model integration

## Project Structure

```text
project-management-system2/
│
├── accounts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── ai_assistant/
│
├── config/
│
├── projects/
│
├── tasks/
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── context/
│       └── services/
│
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

## Backend Setup

Clone the repository:

```bash
git clone https://github.com/bhageshgm7/ai-project-management-system.git
cd ai-project-management-system
```

Create and activate a virtual environment:

### Windows

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
pip install -r requirements.txt
```

Run migrations:

```powershell
python manage.py migrate
```

Start the Django development server:

```powershell
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open another terminal and navigate to the frontend:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the React development server:

```powershell
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

## Authentication

The application uses **JWT authentication** for secure API access.

### Login

```text
POST /api/token/
```

### Refresh Token

```text
POST /api/token/refresh/
```

### Registration

```text
POST /api/register/
```

Example registration request:

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "Test@12345"
}
```

New users are automatically assigned the `MEMBER` role.

## Main API Endpoints

### Projects

```text
/api/projects/
```

### Tasks

```text
/api/tasks/
```

### Users

```text
/api/users/
```

### User Registration

```text
/api/register/
```

### AI Assistant

```text
/api/ai/
```

## AI Assistant

The project includes an AI Assistant designed to provide intelligent assistance within the project management system.

The AI functionality uses **Ollama**, allowing AI processing through a locally running model without requiring a cloud-based AI service.

## Security

The application includes:

* JWT authentication
* Protected frontend routes
* Authenticated API access
* Password hashing through Django authentication
* Role-based access control
* Role-based project and task visibility
* Public registration restricted to MEMBER accounts

## Screenshots

Screenshots can be added here to showcase the application.

Recommended screenshots:

1. Login page
2. Registration page
3. Dashboard
4. Projects page
5. Tasks page
6. AI Assistant

Example structure:

```text
screenshots/
├── login.png
├── register.png
├── dashboard.png
├── projects.png
├── tasks.png
└── ai-assistant.png
```

## Future Improvements

Possible future enhancements include:

* Advanced project analytics
* Notifications
* Email integration
* Team collaboration
* AI conversation history
* Advanced reporting
* Production database support
* Cloud deployment

## Author

**Bhagesh**

GitHub:

https://github.com/bhageshgm7

## License

This project is intended for educational and portfolio purposes.
