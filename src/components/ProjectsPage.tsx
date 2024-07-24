import { useEffect, useState, startTransition } from "react";
import { Link } from "wouter";
import { getProjects } from "../helpers/getData";
import { Project } from "../interfaces/types";
import { ProjectCard } from "./ProjectCard";
import "../styles/ProjectsPage.css";
const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  if (loading) {
    return <div>Loading...</div>; // Indicador de carga
  }

  return (
    <section>
      <section className="projects-page-title-container">
        <h1>Projects</h1>
        <button>
          <Link to="/create-project">Create Project</Link>
        </button>
      </section>

      <section className="projects-page-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </section>
  );
};
export default ProjectsPage;
