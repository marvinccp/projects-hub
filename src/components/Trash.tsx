import trash from "../assets/trash.png";

interface TrashProps {
  deleteTask: () => void;

}

export const Trash = ({ deleteTask}: TrashProps) => {

 
  return (
    <button onClick={deleteTask} className="trash-container">
      <img className="trash-icon" src={trash} alt="trash-icon" />
    </button>
  );
};
