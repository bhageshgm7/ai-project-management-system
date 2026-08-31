import { Link } from "react-router-dom";
import "./Tasks.css";
import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {
const [tasks, setTasks] = useState([]);
const [projects, setProjects] = useState([]);
const [users, setUsers] = useState([]);
const [error, setError] = useState("");

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [projectId, setProjectId] = useState("");
const [assignedTo, setAssignedTo] = useState("");
const [priority, setPriority] = useState("MEDIUM");
const [status, setStatus] = useState("TODO");
const [dueDate, setDueDate] = useState("");

const [editingTask, setEditingTask] = useState(null);

useEffect(() => {
loadData();
}, []);

async function loadData() {
try {
const tasksResponse = await api.get("tasks/");
const projectsResponse = await api.get("projects/");
const usersResponse = await api.get("users/");

  setTasks(tasksResponse.data);
  setProjects(projectsResponse.data);
  setUsers(usersResponse.data);
  setError("");
} catch (err) {
  console.error(err);
  setError("Unable to load tasks, projects, or users.");
}


}

function getProjectName(id) {
const project = projects.find(function (item) {
return item.id === Number(id);
});


if (project) {
  return project.name;
}

return "Project " + id;


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
setTitle("");
setDescription("");
setProjectId("");
setAssignedTo("");
setPriority("MEDIUM");
setStatus("TODO");
setDueDate("");
setEditingTask(null);
}

function handleEdit(task) {
setEditingTask(task);
setTitle(task.title);
setDescription(task.description || "");
setProjectId(String(task.project));
setAssignedTo(
  task.assigned_to ? String(task.assigned_to) : ""
);
setPriority(task.priority);
setStatus(task.status);
setDueDate(task.due_date || "");


window.scrollTo({
  top: 0,
  behavior: "smooth"
});


}

async function handleSubmit(event) {
event.preventDefault();
setError("");


const taskData = {
  project: Number(projectId),
  title: title,
  description: description,
  assigned_to: Number(assignedTo),
  priority: priority,
  status: status,
  due_date: dueDate
};

try {
  if (editingTask) {
    await api.put(
      "tasks/" + editingTask.id + "/",
      taskData
    );
  } else {
    await api.post("tasks/", taskData);
  }

  clearForm();
  await loadData();
} catch (err) {
  console.error(err);
  setError(
    err.response?.data?.detail ||
      "Unable to save task. Make sure you have permission."
  );
}


}

async function handleDelete(task) {
const confirmed = window.confirm(
"Are you sure you want to delete " +
task.title +
"?"
);


if (!confirmed) {
  return;
}

try {
  setError("");

  await api.delete(
    "tasks/" + task.id + "/"
  );

  if (editingTask && editingTask.id === task.id) {
    clearForm();
  }

  await loadData();
} catch (err) {
  console.error(err);
  setError(
    err.response?.data?.detail ||
      "Unable to delete task. Make sure you have permission."
  );
}


}

return ( <div className="tasks-page">
 <nav className="tasks-nav">
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/projects">Projects</Link>
  <Link to="/tasks">Tasks</Link>
</nav>
  <h1>Tasks</h1>

  {error && <p className="error-message">{error}</p>}

  <section>
    <h2>
      {editingTask ? "Edit Task" : "Create Task"}
    </h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <label>Project</label>

      <select
        value={projectId}
        onChange={(event) =>
          setProjectId(event.target.value)
        }
        required
      >
        <option value="">Select project</option>

        {projects.map((project) => (
          <option
            key={project.id}
            value={project.id}
          >
            {project.name}
          </option>
        ))}
      </select>

      <label>Assign To</label>

      <select
        value={assignedTo}
        onChange={(event) =>
          setAssignedTo(event.target.value)
        }
        required
      >
        <option value="">Select user</option>

        {users.map((user) => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.username} ({user.role})
          </option>
        ))}
      </select>

      <label>Priority</label>

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value)
        }
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <label>Status</label>

<select
  value={status}
  onChange={(event) =>
    setStatus(event.target.value)
  }
>
  <option value="TODO">To Do</option>

  <option value="IN_PROGRESS">
    In Progress
  </option>

  <option value="REVIEW">
    Review
  </option>

  <option value="COMPLETED">
    Completed
  </option>
</select>

      <label>Due Date</label>

      <input
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
        required
      />

      <button type="submit">
        {editingTask
          ? "Update Task"
          : "Create Task"}
      </button>

      {editingTask && (
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
    <h2>Tasks</h2>

    {tasks.length === 0 && !error ? (
      <p>No tasks found.</p>
    ) : (
      <div className="tasks-list">
        {tasks.map((task) => (
          <div
            className="task-card"
            key={task.id}
          >
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
              <strong>Project:</strong>{" "}
              {getProjectName(task.project)}
            </p>

            <p>
              <strong>Assigned To:</strong>{" "}
              {getUserName(task.assigned_to)}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {task.priority}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {task.status}
            </p>

            <p>
              <strong>Due:</strong>{" "}
              {task.due_date}
            </p>

            <button
              type="button"
              onClick={() => handleEdit(task)}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(task)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
</div>


);
}

export default Tasks;
