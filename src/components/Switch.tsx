import { useState } from "react";
import "../components/project-details/ProjectDetails.css";

interface SwitchProps {
  state: boolean;
  taskId: string;
  changeColor: () => void
}

export const Switch = ({ state, taskId, changeColor}: SwitchProps) => {
  const [active, setActive] = useState(state);
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
      changeColor()
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
