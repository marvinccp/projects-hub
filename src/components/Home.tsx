import { Link } from "wouter";
import { useState } from "react";
import "../styles/Home.css";
import "../styles/ModalStyles.css";

import { Dialog, Heading, Modal } from "react-aria-components";
// import { useEffect, useState } from "react";
// import { getUsers } from "../helpers/getData";
// import { User } from "../interfaces/types";
// import { UserPage } from "./UserPage";
import { UserForm } from "./UserForm";
import { ClientForm } from "./ClientForm";
import { MapProjects } from "./maps/MapProjects";
export const Home = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const data = await getUsers();
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);
  const [isOpenUser, setOpenUser] = useState<boolean>(false);
  const [isOpenClient, setOpenClient] = useState<boolean>(false);

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
          <Link to="/map">
            <button className="principal-button">View Map</button>
          </Link>
          {/* <Link to="/create-project">
            <button className="contrast-button">Create Projects</button>
          </Link> */}

          <button
            onClick={() => setOpenUser((prev) => !prev)}
            className="contrast-button"
          >
            Create User
          </button>

          <button
            onClick={() => setOpenClient((prev) => !prev)}
            className="contrast-button"
          >
            Create Client
          </button>
        </div>
      </section>
      {/* team contaner */}

      <section className="team-container">
        <div>{/* <h2>Our Team</h2> */}</div>
        {/* <section className="article-user-container">
          {users.map((user) => (
            <UserPage user={user} key={user.id}></UserPage>
          ))}
        </section> */}
      </section>
      <>
        <Modal
          isOpen={isOpenClient}
          onOpenChange={setOpenClient}
          className={"modal"}
          isDismissable
        >
          <Heading slot="mmmmm">
            <Dialog>
             <ClientForm />
            </Dialog>
          </Heading>
        </Modal>
      </>

      <>
        <Modal
          isOpen={isOpenUser}
          onOpenChange={setOpenUser}
          className={"modal"}
          isDismissable
        >
          <Heading slot="title">
            <Dialog>
              <UserForm />
            </Dialog>
          </Heading>
        </Modal>
      </>
      <MapProjects />
    </section>
  );
};
