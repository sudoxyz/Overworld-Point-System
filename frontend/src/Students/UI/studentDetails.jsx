/* eslint-disable react/prop-types */
// src/Students/StudentDetails.js
import React, { useEffect, useState } from "react";
import { fetchStudentNotes } from "../studentApi"; // Import it here

const StudentDetails = ({
  student,
  editStudentId,
  editedStudentData,
  onEditStudent,
  onUpdateStudent,
  onEditInputChange,
  onAddCoins,
  addedCoins,
  onAddInputChange,
  onRemoveStudent,
}) => {
  const [notes, setNotes] = useState([]); // State to store notes for the student

  useEffect(() => {
    if (student?._id) {
      const loadNotes = async () => {
        const studentNotes = await fetchStudentNotes(student._id);
        setNotes(studentNotes);
      };
      loadNotes();
    }
  }, [student]);

  return (
    <div>
      <h2>Selected Student Details:</h2>
      <h3>Name: {student?.name}</h3>
      <h3>Coins: {student?.coins}</h3>
      <h3>ID: {student?._id}</h3>
      <hr />


      {/* Notes Section */}
      <h2>Notes:</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id}>
            <p><strong>Mentor:</strong> {note.mentor_name}</p>
            <p><strong>Note:</strong> {note.notes}</p>
            <p><strong>Date:</strong> {new Date(note.date).toLocaleString()}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No notes available for this student.</p>
      )}

      {editStudentId ? (
        <form onSubmit={() => onUpdateStudent(editStudentId)}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedStudentData.name}
            onChange={onEditInputChange}
          />
          <br />
          <label htmlFor="coins">Coins: </label>
          <input
            type="number"
            id="coins"
            name="coins"
            value={editedStudentData.coins}
            onChange={onEditInputChange}
          />
          <br />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => onEditStudent(null)}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => onEditStudent(student._id)}>Edit</button>
      )}

      {/* Add Coins Functionality */}
      {editStudentId ? (
        <form onSubmit={() => onAddCoins(editStudentId)}>
          <label htmlFor="coins">Coins to add: </label>
          <input
            type="number"
            id="coins"
            name="coins"
            value={addedCoins.coins || 0}
            onChange={onAddInputChange}
          />
          <br />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <button onClick={() => onEditStudent(student._id)}>Add Credits</button>
      )}

      <button onClick={() => onRemoveStudent(student._id)}>
        Remove Student
      </button>
      <hr />

    </div>
  );
};

export default StudentDetails;
