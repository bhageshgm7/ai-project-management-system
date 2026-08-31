import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const { logout } = useAuth();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [projectsResponse, tasksResponse] = await Promise.all([
          api.get("projects/"),
          api.get("tasks/"),
        ]);

        setProjects(projectsResponse.data);
        setTasks(tasksResponse.data);
        setError("");
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard data.");
      }
    };

    loadDashboardData();
  }, []);

  const activeProjects = projects.filter(
    (project) => project.status === "ACTIVE"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED"
  ).length;

  const plannedProjects = projects.filter(
    (project) => project.status === "PLANNED"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "COMPLETED"
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const overdueTasks = tasks.filter((task) => {
    return (
      task.due_date &&
      task.due_date < today &&
      task.status !== "COMPLETED"
    );
  });

  const overallProgress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>AI Project Management System</h1>

          <nav className="dashboard-nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/ai-assistant">AI Assistant</Link>
          </nav>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-content">
        <h2>Dashboard Overview</h2>

        {error && (
          <p className="error-message">{error}</p>
        )}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Projects</h3>
            <p>{projects.length}</p>
          </div>

          <div className="stat-card">
            <h3>Planned Projects</h3>
            <p>{plannedProjects}</p>
          </div>

          <div className="stat-card">
            <h3>Active Projects</h3>
            <p>{activeProjects}</p>
          </div>

          <div className="stat-card">
            <h3>Completed Projects</h3>
            <p>{completedProjects}</p>
          </div>

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{tasks.length}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Tasks</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Overdue Tasks</h3>
            <p>{overdueTasks.length}</p>
          </div>
        </div>

        <section className="task-statistics">
          <h2>Task Status</h2>

          <div className="task-status-grid">
            <div className="task-status-card">
              <h3>To Do</h3>
              <p>{todoTasks}</p>
            </div>

            <div className="task-status-card">
              <h3>In Progress</h3>
              <p>{inProgressTasks}</p>
            </div>

            <div className="task-status-card">
              <h3>Completed</h3>
              <p>{completedTasks}</p>
            </div>
          </div>
        </section>

        <section className="overall-progress">
          <h2>Overall Task Progress</h2>

          <div className="dashboard-progress-bar">
            <div
              className="dashboard-progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>

          <p>{overallProgress}% Completed</p>
        </section>

        <section className="overdue-section">
          <h2>Overdue Tasks</h2>

          {overdueTasks.length === 0 ? (
            <p>No overdue tasks. Great job! 🎉</p>
          ) : (
            <div className="overdue-list">
              {overdueTasks.map((task) => (
                <div
                  className="overdue-task"
                  key={task.id}
                >
                  <strong>{task.title}</strong>

                  <p>Due: {task.due_date}</p>

                  <p>Status: {task.status}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="dashboard-cards">
          <Link
            to="/projects"
            className="dashboard-card"
          >
            <h3>Projects</h3>
            <p>Manage your projects</p>
          </Link>

          <Link
            to="/tasks"
            className="dashboard-card"
          >
            <h3>Tasks</h3>
            <p>Track and manage tasks</p>
          </Link>

          <Link
            to="/ai-assistant"
            className="dashboard-card"
          >
            <h3>AI Assistant</h3>
            <p>AI-powered project assistance</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;