import { Link } from "wouter";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import { getUsers } from "../helpers/getData";
import { User } from "../interfaces/types";

export const Home = () => {


  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);


  return (
    <section className="home-container">
      <aside className="home-title-container">
        <h1>Welcome to Projects Planner!</h1>
      </aside>
      <p>
        We are thrilled to welcome you to Projects Planner, your one-stop
        solution for creating and managing projects with ease. Our platform is
        designed to help you stay organized, streamline your workflow, and
        collaborate effectively with your team.
      </p>
      <h2>Let's Get Started!</h2>
      <p>
        Join us and experience a seamless way to plan, track, and complete your
        projects. Whether you're managing a small task or a large-scale project,
        Projects Planner provides the tools and features you need to succeed.
        Dive in and explore the future of project management today!
      </p>
      <div className="buttons-menu-homepage-container">
        <Link to="/projects">
        <button>Projects</button>
        </Link>
        <Link to="/create-project">
        <button>Create Projects</button>
        </Link>
      </div>
     <section>
      <h2>Our Team</h2>
      {
        users.map((user) => (
          <article key={user.id}>
            <h3>{user.name}</h3>
          </article>
        ))
      }
     </section>
    </section>
  );
};
