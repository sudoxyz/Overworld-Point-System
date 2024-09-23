/* eslint-disable react/prop-types */
// src/Students/StudentForm.js
import { useState } from "react";

const StudentForm = ({ onAddStudent }) => {
  const [newName, setNewName] = useState("");
  const [newCoins, setNewCoins] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({ name: newName, coins: newCoins });
    setNewName("");
    setNewCoins(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <br />
      <label htmlFor="coins">Initial Coins: </label>
      <input
        type="number"
        id="coins"
        value={newCoins}
        onChange={(e) => setNewCoins(Number(e.target.value))}
      />
      <br />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
