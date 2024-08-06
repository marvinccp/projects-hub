import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import { Home } from "./Home";
import "../styles/Router.css";
import { UserForm } from "./UserForm";
import { ClientForm } from "./ClientForm";
import { SignIn } from "./login/SignIn";
import { MapWrapper } from "./MapWrapper";
import { ProjectDetails } from "./project-details/ProjectDetails";
import { ProtectedRoutes } from "./login/ProtectedRoutes";
import { UnAuthorized } from "./UnAuthorized";

export const Router = () => {
  const ProjectsPage = lazy(() => import("./ProjectsPage"));
  const ProjectsForm = lazy(() => import("./ProjectsForm"));

  return (
    <>
      <section className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
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
            <ProtectedRoutes
              path={"/create-project"}
              component={ProjectsForm}
              userRole="admin"
            />
            <Route path={"/create-user"} component={() => <UserForm />} />
            <Route path={"/create-client"} component={() => <ClientForm />} />
            <Route path={"/unauthorized"} component={() => <UnAuthorized />} />
            <Route path={"/map"} component={() => <MapWrapper />} />
            <Route path={"/projects/:id"}>
              {(params) => <ProjectDetails id={params.id} />}
            </Route>
          </Switch>
        </Suspense>
      </section>
    </>
  );
};
