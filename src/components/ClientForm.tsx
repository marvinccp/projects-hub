import { useState } from "react";
import "../styles/ClientFormStyles.css";
import { useLocation } from "wouter";

export const ClientForm = () => {
  const [, setLocation] = useLocation();
  const [formError, setFormError] = useState([]);
  const [errorForm, setErrorForm] = useState(false);
  console.log(formError);
  const [notification, setNotification] = useState<boolean>(false);

  const initialData = {
    name: "",
    last: "",
    email: "",
    adress: "",
    phone: Number(),
    cp: Number(),
  };
  const [data, setData] = useState<{
    name: string;
    last: string;
    email: string;
    adress: string;
    phone: number;
    cp: number;
  }>(initialData);
  console.table(data);

  const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const createClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      name: data.name,
      last: data.last,
      email: data.email,
      adress: data.adress,
      phone: Number(data.phone),
      cp: Number(data.cp),
    };
    console.log(dataToSend);
    try {
      const response = await fetch(
        "https://nest-basic-production.up.railway.app/clients/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          setFormError(errorData.message || {});
          setErrorForm(true);
        } else {
          console.log("error ocurred");
        }
        throw new Error("Network response was not ok");
      } else {
        setNotification(true);
        setTimeout(() => {
          setLocation("/create-project");
        }, 2000);
      }
      await response.json();
      setData({
        name: "",
        last: "",
        email: "",
        adress: "",
        phone: Number(),
        cp: Number(),
      });
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  };

  if (notification) {
    return <div className="notification">Client created successfully</div>;
  }
  return (
    <section className="form-client-container">
      <form onSubmit={createClient}>
        <h4
          style={{
            marginBottom: "30px",
          }}
        >
          CREATE CLIENT
        </h4>

        <input
          onChange={formData}
          type="text"
          name="name"
          placeholder={errorForm ? "name is required" : "name *"}
          value={data.name}
        />
        <input
          onChange={formData}
          type="text"
          name="last"
          placeholder={errorForm ? "last name is required" : "last name *"}
          value={data.last}
        />
        <input
          onChange={formData}
          type="email"
          name="email"
          placeholder={errorForm ? "email is required" : "email *"}
          value={data.email}
        />
        <input
          onChange={formData}
          type="text"
          name="adress"
          placeholder={errorForm ? "address is required" : "address *"}
          value={data.adress}
        />
        <input
          onChange={formData}
          type="text"
          name="phone"
          placeholder="phone"
          value={data.phone !== 0 ? data.phone : ""}
        />
        <input
          onChange={formData}
          type="text"
          name="cp"
          placeholder={errorForm ? "postal code is required" : "postal code *"}
          value={data.cp !== 0 ? data.cp : ""}
        />
        <input onChange={formData} type="submit" value="Create Client" />
      </form>
    </section>
  );
};
