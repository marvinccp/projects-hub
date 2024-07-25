import { startTransition, useEffect, useState } from "react";
import { getProjects } from "../helpers/getData";
import { Project as projecType } from "../interfaces/types";
import { useLocation } from "wouter";
import "../styles/ProjectDetails.css";

export const ProjectDetails = ({ id }: { id: string }) => {
  const [projects, setProjects] = useState<projecType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState<boolean>(false);
  const [data, setData] = useState<{
    task: string;
    state: boolean;
    projectId: string;
  }>({
    task: "",
    state: false,
    projectId: id,
  });
  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      };
      fetchData();
    });
  }, []);

  const deleteProject = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(
        `https://nest-basic-production.up.railway.app/projects/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to delete project with id: ${id}`);
      }
      setProjects(projects.filter((project) => project.id !== id));
      setNotification(true);
      setTimeout(() => {
        setLocation("/projects");
      }, 2000);
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  const project = projects.find((p) => p.id === id);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createTask = async () => {
    const res = await fetch(
      "https://nest-basic-production.up.railway.app/tasks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    !res.ok ? new Error("Failed to create task") : null;
    const newTask = await res.json();
    setData({ task: "", state: false, projectId: id });
    return newTask;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = await createTask();
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === id ? { ...p, tasks: [...p.tasks, newTask] } : p
      )
    );
  };
  if (notification) {
    return (
      <div className="notification-delete">Project deleted successfully</div>
    );
  }
  return (
    <section className="project-view-container">
      <article className="project-details-container">
        <div className="project-identify-container">
          <button onClick={() => deleteProject(id)}>Delete Project</button>
          <p>
            Nombre: <span>{project?.title}</span>
          </p>
          <p className="active-inactive-container">
            Estado:{" "}
            <span>
              {project?.active ? (
                <span className="project-active">Activo</span>
              ) : (
                <span className="project-inactive">Inactivo</span>
              )}
            </span>
          </p>
          <p>
            Tiempo de Ejecución: <span>{project?.time} Días</span>
          </p>
          <p>id: {project?.id}</p>
        </div>
        <section className="project-info-container">
          <div className="project-description-container">
            {project?.project.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="task-form-container">
          <form className="taskform" onSubmit={handleSubmit}>
            <input
              onChange={formData}
              type="text"
              name="task"
              placeholder="Task Description"
              value={data.task}
            />

            <input type="submit" value="create Task" />
          </form>
        </section>
      </article>
      <div className="project-task-view-container">
        <div className="project-task-title-container">
          <h2>Tasks</h2>
        </div>
        <section className="tasks-container">
          {project?.tasks.map((task) => (
            <div className="task-info-container" key={task.id}>
              <div className="task-view">
                <p>{task.task} </p>
                <span className="pending">{task.state ? "Completed" : "Pending"}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};
