import { Route } from "wouter";
import { Project } from "./Project";
import { lazy, Suspense } from "react";
import { Home } from "./Home";
import '../styles/Router.css'

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
        <Route path={"/"} component={() => <Home />} />
        <Route path={"/create-project"} component={() => <ProjectsForm />} />
        <Route path={"/projects/:id"}>
          {(params) => <Project id={params.id} />}
        </Route>
      </Suspense>
    </section>
  );
};
