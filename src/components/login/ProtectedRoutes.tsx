import { Redirect, Route, RouteComponentProps } from "wouter";

interface ProtectedRoutesProps {
    component:React.ComponentType<RouteComponentProps>;
    userRole?:string
    path:string
}


export const ProtectedRoutes:React.FC<ProtectedRoutesProps> = ({ component:Component, userRole, ...rest}) => {
    let  userStoredRole


    const user = localStorage.getItem('user')
    if(user){
      userStoredRole =   JSON.parse(user).role
    }
    const token = localStorage.getItem('accessToken')
    console.log(user, token);


    try {
        if(!token || !userRole){
            return <Redirect to="/"/>
        }
        if (userRole && userRole !== userStoredRole) {
            return <Redirect to="/unauthorized" />;
          }
    
          return <Route {...rest} component={Component} />;
    } catch (error) {
        console.log(error);
    }
   
}
