import { useState } from "react";
import "../styles/UserFormStyles.css";
import { useLocation } from "wouter";

export const UserForm = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  const initialData = {
    name: "",
    email: "",
    password: "",
    description: "",
    image: undefined,
    position: "",
    phone: 0,
  };
  const [data, setData] = useState<{
    name: string;
    email: string;
    password: string;
    description: string;
    image?: string;
    position: string;
    phone: number;
  }>(initialData);
  console.table(data);

  const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      ...data,
      phone: Number(data.phone),
    };
    console.log(dataToSend);
    try {
      const response = await fetch(
        "https://nest-basic-production.up.railway.app/users/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
      setData({
        name: "",
        email: "",
        password: "",
        description: "",
        image: undefined,
        position: "",
        phone: 0,
      });
      setNotification(true);
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  };
  if (notification) {
    return <div className="notification">User created successfully</div>;
  }

  return (
    <section className="form-user-container">
      <form onSubmit={createUser}>
        <h4
          style={{
            marginBottom: "30px",
          }}
        >
          CREATE USER
        </h4>
        <input onChange={formData} type="text" name="name" placeholder="name" />
        <input
          onChange={formData}
          type="text"
          name="email"
          placeholder="e-mail"
          value={data.email}
        />
        <input
          onChange={formData}
          type="text"
          name="password"
          placeholder="password"
          value={data.password}
        />
        <input
          onChange={formData}
          type="text"
          name="description"
          placeholder="description"
          value={data.description}
        />
        <input
          onChange={formData}
          type="text"
          name="image"
          placeholder="image"
          value={data.image}
        />
        <input
          onChange={formData}
          type="text"
          name="position"
          placeholder="position"
          value={data.position}
        />
        <input
          onChange={formData}
          type="text"
          name="phone"
          placeholder="phone"
          value={data.phone}
        />
        <input onChange={formData} type="submit" value="Create user" />
      </form>
    </section>
  );
};
