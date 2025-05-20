import React from "react";
import "./Card.css";

const Card = ({ task, onDelete }) => {
  return (
    <div className="card">
      <p>{task.text}</p>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
};

export default Card;
