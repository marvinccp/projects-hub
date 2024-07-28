import { User } from "../interfaces/types";
import "../styles/UserPage.css";

interface UserPageProps {
  user: User;
}


export const UserPage: React.FC<UserPageProps> = ({ user }) => {
  return (
    <article className="user-card">
      <div>
      </div>
      <div>
        <h3>{user.name}</h3>
        <p className="user-description">{user.description}</p>
      </div>
    </article>
  );
};
