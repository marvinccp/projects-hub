import { useEffect, useState } from "react";
import { Client, User } from "../interfaces/types";
import { getClients, getUsers } from "../helpers/getData";
import { useLocation } from "wouter";
import "../styles/projectsFormPage.css";
import brain from "../assets/cerebro-ideia.gif";
import { fetchWithAuth } from "./login/authUtils";
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
  const [clients, setClients] = useState<Client[]>([]);
  console.log(clients);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    const fetchClients = async () => {
      const client = await getClients();
      setClients(client);
    };
    fetchUsers();
    fetchClients();
  }, []);

  const [data, setData] = useState<{
    project: string;
    time: number;
    userId: [] | null;
    title: string;
    active: boolean;
    clientId: string;
    postalCode: string;
    address: string;
  }>({
    project: "",
    time: 0,
    userId: null,
    title: "",
    active: true,
    clientId: "",
    postalCode: "",
    address: "",
  });
  console.table(data);
  const formData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(e.target.type);
    const { value, name, type, checked } = e.target as HTMLInputElement;
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
      clientId: data.clientId,
      postalCode: data.postalCode,
      address: data.address,
    };
    console.log(dataToSend);
    const response = await fetchWithAuth(
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
    setData({
      project: "",
      time: 30,
      userId: null,
      title: "",
      active: true,
      clientId: "",
      postalCode: "",
      address: "",
    });
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
          <select id="client-select" name="clientId" onChange={formData}>
            <option value="">Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id || ""}>
                {client.name} {client.last}
              </option>
            ))}
          </select>
          <input
            onChange={formData}
            type="text"
            name="address"
            value={data.address} placeholder="address"
          />
          <input
            onChange={formData}
            type="text"
            name="postalCode"
            value={data.postalCode} placeholder="postal code"
          />
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
