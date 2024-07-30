import { Project, User, Client } from "../interfaces/types";

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(
      "https://nest-basic-production.up.railway.app/users/"
    );

    if (!res.ok) throw new Error(`${res.statusText}`);
    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
export const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(
      "https://nest-basic-production.up.railway.app/projects/"
    );

    if (!res.ok) throw new Error(`${res.statusText}`);
    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
export const getClients = async (): Promise<Client[]> => {
  try {
    const res = await fetch(
      "https://nest-basic-production.up.railway.app/clients/"
    );

    if (!res.ok) throw new Error(`${res.statusText}`);
    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

// export const getLocal = async () => {
//   const res = await fetch("http://localhost:3000/");
//   const data = await res.json();
//   console.log(data);
//   return data;
// };
