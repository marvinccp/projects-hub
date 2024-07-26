import { useState } from "react";
import "../styles/ProjectDetails.css";

interface SwitchProps {
  state: boolean;
  taskId: string;
}

export const Switch = ({ state, taskId }: SwitchProps) => {
  const [active, setActive] = useState(state);
  console.log(state);
  console.log(active);
  console.log(taskId);

  const handleSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://nest-basic-production.up.railway.app/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state: !active }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task state");
      }
      setActive(!active);
      return response;
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };
  return (
    <button className="switch-container" onClick={handleSwitch}>
      {active ? (
        <span className="completed">Completed</span>
      ) : (
        <span className="pending">Pending</span>
      )}
    </button>
  );
};
