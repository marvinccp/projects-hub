import { Link } from "wouter";
import { Project } from "../interfaces/types";
import "../styles/ProjectCard.css";
interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="project-card-container">
      <div key={project.id}>
        <h4>{project.project}</h4>
        <button className="project-card-view-button">
          <Link to={`/projects/${project.id}`} state={project}>
            View Project
          </Link>
        </button>
      </div>
    </article>
  );
};
