import { useEffect, useState } from "react";
import { User } from "../interfaces/types";
import { getUsers } from "../helpers/getData";
import { useLocation } from "wouter";
import "../styles/projectsFormPage.css";
import brain from "../assets/cerebro-ideia.gif";
const timeOption = [
  { text: "15 Días", time: 15 },
  { text: "30 Días", time: 30 },
  { text: "45 Días", time: 45 },
  { text: "60 Días", time: 60 },
  { text: "Undefined", time: 1 },
];

const ProjectsForm = () => {
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const [data, setData] = useState<{
    project: string;
    time: number;
    userId: [] | null;
    title: string;
    active: boolean;
  }>({
    project: "",
    time: 0,
    userId: null,
    title: "",
    active: true,
  });
  console.table(data);
  const formData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  
  ) => {
    console.log(e.target.type);
    const { value, name, type, checked } =  e.target as HTMLInputElement;
    console.log(value, checked);
    setData((prevData) => ({
      ...prevData,
      [name]: type === "chekbox" ? checked : value,
    }));
  };

  const handleData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      project: data.project,
      time: Number(data.time),
      userId: data.userId ? [data.userId] : null,
      title: data.title,
      active: data.active,
    };
    console.log(dataToSend);
    const response = await fetch(
      "https://nest-basic-production.up.railway.app/projects/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await response.json();
    setData({ project: "", time: 30, userId: null, title: "", active: true });
    setNotification(true);
    setTimeout(() => {
      setLocation("/projects");
    }, 2000);
  };

  if (notification) {
    return <div className="notification">Project created successfully</div>;
  }

  return (
    <section className="projects-form-page-container">
      <section className="projects-image-container">
        <img src={brain} />
      </section>
      <section className="projects-form-container">
        <form className="form" onSubmit={handleData}>
          {/* <input
            type="checkbox"
            name="active"
            id="active"
            checked={data.active}
          /> */}
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={formData}
            placeholder="Project Title"
          />

          <select name="time" id="time-select" onChange={formData}>
            <option>Estimated Time</option>
            {timeOption.map((t) => (
              <option key={t.text} value={t.time}>
                {t.text}
              </option>
            ))}
          </select>

          <select id="user-select" name="userId" onChange={formData}>
            <option value="">Leader(Optional)</option>
            {users.map((user) => (
              <option key={user.id} value={user.id || ""}>
                {user.name}
              </option>
            ))}
          </select>
          <textarea
            onChange={formData}
            placeholder="Project Description"
            name="project"
            value={data.project}
          />
          <input type="submit" value="Crear Projecto" />
        </form>
      </section>
    </section>
  );
};
export default ProjectsForm;
