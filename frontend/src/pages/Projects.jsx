import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Projects.css";

function Projects() {
const [projects, setProjects] = useState([]);
const [users, setUsers] = useState([]);
const [error, setError] = useState("");

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [manager, setManager] = useState("");
const [status, setStatus] = useState("PLANNED");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const [editingProject, setEditingProject] = useState(null);

useEffect(() => {
loadData();
}, []);

async function loadData() {
try {
const projectsResponse = await api.get("projects/");
const usersResponse = await api.get("users/");


  setProjects(projectsResponse.data);
  setUsers(usersResponse.data);
  setError("");
} catch (err) {
  console.error(err);
  setError("Unable to load projects or users.");
}


}

function getUserName(id) {
const user = users.find(function (item) {
return item.id === Number(id);
});


if (user) {
  return user.username + " (" + user.role + ")";
}

return "User " + id;


}

function clearForm() {
setName("");
setDescription("");
setManager("");
setStatus("PLANNED");
setStartDate("");
setEndDate("");
setEditingProject(null);
}

function handleEdit(project) {
setEditingProject(project);
setName(project.name);
setDescription(project.description || "");
setManager(String(project.manager));
setStatus(project.status);
setStartDate(project.start_date || "");
setEndDate(project.end_date || "");


window.scrollTo({
  top: 0,
  behavior: "smooth"
});


}

async function handleSubmit(event) {
event.preventDefault();
setError("");


const projectData = {
  name: name,
  description: description,
  manager: Number(manager),
  status: status,
  start_date: startDate || null,
  end_date: endDate || null
};

try {
  if (editingProject) {
    await api.put(
      "projects/" + editingProject.id + "/",
      projectData
    );
  } else {
    await api.post("projects/", projectData);
  }

  clearForm();
  await loadData();
} catch (err) {
  console.error(err);
  setError(
    err.response?.data?.detail ||
      "Unable to save project. Make sure you have permission."
  );
}


}

async function handleDelete(project) {
const confirmed = window.confirm(
"Are you sure you want to delete " +
project.name +
"?"
);


if (!confirmed) {
  return;
}

try {
  setError("");

  await api.delete(
    "projects/" + project.id + "/"
  );

  if (
    editingProject &&
    editingProject.id === project.id
  ) {
    clearForm();
  }

  await loadData();
} catch (err) {
  console.error(err);
  setError(
    err.response?.data?.detail ||
      "Unable to delete project. Make sure you have permission."
  );
}


}

return ( <div className="projects-page"> 
<nav className="projects-nav">
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/projects">Projects</Link>
  <Link to="/tasks">Tasks</Link>
</nav>
 <h1>Projects</h1>

  {error && (
    <p className="error-message">{error}</p>
  )}

  <section>
    <h2>
      {editingProject
        ? "Edit Project"
        : "Create Project"}
    </h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        required
      />

      <textarea
        placeholder="Project description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <label>Manager</label>

      <select
        value={manager}
        onChange={(event) =>
          setManager(event.target.value)
        }
        required
      >
        <option value="">Select manager</option>

        {users
          .filter(function (user) {
            return (
              user.role === "ADMIN" ||
              user.role === "MANAGER"
            );
          })
          .map(function (user) {
            return (
              <option
                key={user.id}
                value={user.id}
              >
                {user.username} ({user.role})
              </option>
            );
          })}
      </select>

      <label>Status</label>

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value)
        }
      >
       <option value="PLANNED">Planned</option>
       <option value="ACTIVE">Active</option>
       <option value="COMPLETED">Completed</option>
       </select>

      <label>Start Date</label>

      <input
        type="date"
        value={startDate}
        onChange={(event) =>
          setStartDate(event.target.value)
        }
      />

      <label>End Date</label>

      <input
        type="date"
        value={endDate}
        onChange={(event) =>
          setEndDate(event.target.value)
        }
      />

      <button type="submit">
        {editingProject
          ? "Update Project"
          : "Create Project"}
      </button>

      {editingProject && (
        <button
          type="button"
          onClick={clearForm}
        >
          Cancel
        </button>
      )}
    </form>
  </section>

  <section>
    <h2>Projects</h2>

    {projects.length === 0 && !error ? (
      <p>No projects found.</p>
    ) : (
      <div className="projects-list">
        {projects.map(function (project) {
          return (
            <div
              className="project-card"
              key={project.id}
            >
              <h2>{project.name}</h2>

              <p>{project.description}</p>

              <p>
                <strong>Manager:</strong>{" "}
                {getUserName(project.manager)}
              </p>

              <p>
  <strong>Status:</strong>{" "}
  {project.status}
</p>

<p>
  <strong>Tasks:</strong>{" "}
  {project.completed_tasks} / {project.total_tasks} completed
</p>

<p>
  <strong>Progress:</strong> {project.progress}%
</p>

<div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${project.progress}%` }}
  ></div>
</div>

              <p>
                <strong>Start:</strong>{" "}
                {project.start_date || "Not set"}
              </p>

              <p>
                <strong>End:</strong>{" "}
                {project.end_date || "Not set"}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleEdit(project)
                }
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(project)
                }
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    )}
  </section>
</div>


);
}

export default Projects;
