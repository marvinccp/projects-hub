import { startTransition, useEffect, useState } from "react";
import { getProjects } from "../helpers/getData";
import { Project as projecType } from "../interfaces/types";
import { useLocation } from "wouter";
import "../styles/Project.css";

export const Project = ({ id }: { id: string }) => {
  const [projects, setProjects] = useState<projecType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState<boolean>(false);

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

  if (notification) {
    return (
      <div className="notification-delete">Project deleted successfully</div>
    );
  }
  return (
    <section className="project-view-container">
      <article className="project-details-container">
        <button onClick={() => deleteProject(id)}>Delete Project</button>
        <p>id: {project?.id}</p>
        <h1>{project?.project}</h1>
        <p>Tiempo de Ejecución</p>
        <h2>{project?.time} Días</h2>
        <form>
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="submit" value="create Task" />
        </form>
      </article>
      <div className="project-task-view-container">
        <h2>Tasks</h2>
        {project?.tasks.map((task) => (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }} key={task.id}>
            <p>{task.task}</p>
            <div
              style={{
                display: "inline-block",
                backgroundColor: task.state ? "green" : "red",
                width: "10px",
                height: "10px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};
