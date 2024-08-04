import { useLocation } from "wouter";
import "../login/SignIn.css";
import { useState } from "react";
export const SignIn = () => {
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState<boolean>(false);
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    try {
      const response = await fetch("https://nest-basic-production.up.railway.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataToSend,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("No");
      }

      const { access_token, refreshToken, user} = await response.json();
      console.log(access_token, refreshToken);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem('user', JSON.stringify(user))
      setLocation("/home");
      setNotification(true);
      setData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      setData({
        email: "",
        password: "",
      });
    }
  };

  if (notification) {
    return (
      <h1
        style={{
          background: "lightpink",
          width: "50%",
          textAlign: "center",
          height: "30px",
          paddingTop: "5px",
          borderRadius: "10px",
        }}
      >
        No eres bienvenid@
      </h1>
    );
  }
  return (
    <form onSubmit={handleLogin}>
      <input
        value={data.email}
        onChange={formData}
        type="text"
        name="email"
        placeholder="email"
      />
      <input
        value={data.password}
        onChange={formData}
        type="text"
        name="password"
        placeholder="password"
      />
      <input type="submit" value="Login" />
    </form>
  );
};
