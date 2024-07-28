import { Link } from "wouter";
import "../styles/Home.css";
// import { useEffect, useState } from "react";
// import { getUsers } from "../helpers/getData";
// import { User } from "../interfaces/types";
// import { UserPage } from "./UserPage";

export const Home = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const data = await getUsers();
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <section className="home-container">
      <section className="welcome-home-container">
        <div className="welcome-home-section">
          <aside className="home-title-container">
            <h1>Welcome to Projects Planner!</h1>
          </aside>

          <p>
            Join us and experience a seamless way to plan, track, and complete
            your projects. Whether you're managing a small task or a large-scale
            project, Projects Planner provides the tools and features you need
            to succeed. Dive in and explore the future of project management
            today!
          </p>
          <h2>Let's Get Started!</h2>
        </div>

        <div className="buttons-menu-homepage-container">
          <Link to="/projects">
            <button className="principal-button">Projects</button>
          </Link>
          <Link to="/create-project">
            <button className="contrast-button">Create Projects</button>
          </Link>
        </div>
      </section>
      {/* team contaner */}

      <section className="team-container">
        <div>
          {/* <h2>Our Team</h2> */}
        </div>
        {/* <section className="article-user-container">
          {users.map((user) => (
            <UserPage user={user} key={user.id}></UserPage>
          ))}
        </section> */}
      </section>
    </section>
  );
};
