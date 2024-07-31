import { useLocation } from "wouter";

export const SignIn = () => {
  const [, setLocation] = useLocation();

  const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };
  return (
    <form onSubmit={() => setLocation("/home")}>
      <input onChange={formData} type="text" name="" id="" />
      <input onChange={formData} type="text" name="" id="" />
      <input type="submit" value="Login" />
    </form>
  );
};
