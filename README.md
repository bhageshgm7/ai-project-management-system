# AI Project Management System

A full-stack project management application built with **Django REST Framework** and **React**, with JWT authentication and an integrated AI assistant powered by Ollama.

The system helps users manage projects and tasks through a clean, responsive dashboard while providing AI-assisted project management capabilities.

## Features

* User registration and login
* JWT-based authentication
* Automatic MEMBER role for newly registered users
* Project management
* Task management
* Task priority and status tracking
* Protected routes
* AI Assistant powered by Ollama
* Responsive React frontend
* Dark Glass UI design
* RESTful APIs using Django REST Framework
* SQLite database for development

## User Roles

The system supports three user roles:

* **ADMIN** – Administrative access
* **MANAGER** – Project and management-related access
* **MEMBER** – Regular project and task access

New users registering through the public registration page are automatically assigned the **MEMBER** role.

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
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
├── .gitignore
└── README.md
```

## Backend Setup

Clone the repository and open the project folder:

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

Start the Django server:

```powershell
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open another terminal:

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

The application uses JWT authentication.

### Login Endpoint

```text
POST /api/token/
```

### Refresh Token Endpoint

```text
POST /api/token/refresh/
```

### Registration Endpoint

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

The AI functionality uses **Ollama**, allowing AI processing through a locally running model.

## Security

The application includes:

* JWT authentication
* Protected frontend routes
* Authenticated API access
* Password hashing through Django authentication
* Role-based user model
* Public registration restricted to MEMBER accounts

## Screenshots

Screenshots of the application can be added here.

Recommended screenshots:

1. Login page
2. Registration page
3. Dashboard
4. Projects page
5. Tasks page
6. AI Assistant

Example:

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
