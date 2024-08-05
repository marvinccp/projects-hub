export const getUserRole = (): string => {
  const user = localStorage.getItem("user");
  if (!user) {
    throw new Error("Not found user");
  }
  return JSON.parse(user).role;
};
