import { Route } from "wouter";
import { lazy, Suspense } from "react";
import { Home } from "./Home";
import '../styles/Router.css'
import { ProjectDetails } from "./ProjectDetails";
import { UserForm } from "./UserForm";
import { ClientForm } from "./ClientForm";
import { SignIn } from "./login/SignIn";

export const Router = () => {
  const ProjectsPage = lazy(() => import("./ProjectsPage"));
  const ProjectsForm = lazy(() => import("./ProjectsForm"));

  return (
    
    <section className="container">
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        {/* <button className="router-button--">
          <Link to="/projects">Projects</Link>
          </button>
          <button className="router-button--">
          <Link to="/">Home</Link>
        </button> */}
        <Route path={"/projects"} component={() => <ProjectsPage />} />
        <Route path={"/"} component={() => <SignIn />} />
        <Route path={"/home"} component={() => <Home />} />
        <Route path={"/create-project"} component={() => <ProjectsForm />} />
        <Route path={"/create-user"} component={() => <UserForm />} />
        <Route path={"/create-client"} component={() => <ClientForm />} />
        <Route path={"/projects/:id"}>
          {(params) => <ProjectDetails id={params.id} />}
        </Route>
      </Suspense>
    </section>
  );
};
