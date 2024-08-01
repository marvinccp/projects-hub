import { useLocation } from "wouter";
import "../login/SignIn.css";
import { useState } from "react";
export const SignIn = () => {
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState<boolean>(false);
  const [data, setData] = useState<{
    userName: string;
    password: string;
  }>({
    userName: "",
    password: "",
  });

  const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (data.userName === "user" && data.password === "1234") {
      setLocation("/home");
    }
    setNotification(true);
  };

  if (notification) {
    return <h1 style={{
      background:'lightpink', 
      width:'50%',
      textAlign:'center',
      height:'30px',
    paddingTop:'5px',
    borderRadius:'10px'
    }}>No eres bienvenid@</h1>;
  }
  return (
    <form onSubmit={handleLogin}>
      <input
        value={data.userName}
        onChange={formData}
        type="text"
        name="userName"
      />
      <input
        value={data.password}
        onChange={formData}
        type="text"
        name="password"
      />
      <input type="submit" value="Login" />
    </form>
  );
};
