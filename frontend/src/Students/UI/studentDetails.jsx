/* eslint-disable react/prop-types */
// src/Students/StudentDetails.js
import { useEffect, useState } from "react";
import { fetchStudentNotes, addNote, deleteNote } from "../studentApi"; // Import it here

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
  const [newNote, setNewNote] = useState({ mentor_name: "", notes: "" }); // State for new note
  const [noteError, setNoteError] = useState(null);

  useEffect(() => {
    if (student?._id) {
      const loadNotes = async () => {
        const studentNotes = await fetchStudentNotes(student._id);
        setNotes(studentNotes);
      };
      loadNotes();
    }
  }, [student]);

  const handleNoteInputChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      const updatedNotes = await fetchStudentNotes(student._id); // Refresh notes
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete the note.");
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!newNote.mentor_name || !newNote.notes) {
      setNoteError("Mentor name and note content are required.");
      return;
    }

    try {
      await addNote({
        ...newNote,
        student_id: student._id, // Add student ID to the note
      });
      setNewNote({ mentor_name: "", notes: "" }); // Reset form
      setNoteError(null); // Clear any errors
      const updatedNotes = await fetchStudentNotes(student._id); // Refresh notes
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error adding note:", error);
      setNoteError("Failed to add note. Please try again.");
    }
  };

  return (
    <div>
      <h2>Selected Mentor Details:</h2>
      <h3>Name: {student?.name}</h3>
      <h3>Coins: {student?.coins}</h3>
      <h3>ID: {student?._id}</h3>
      <hr />

      {/* Notes Section */}
      <h2>Notes:</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id}>
            <p>
              <strong>Overseer:</strong> {note.mentor_name}
            </p>
            <p>
              <strong>Note:</strong> {note.notes}
            </p>
            <p>
              <strong>Date:</strong> {new Date(note.date).toLocaleString()}
            </p>
            <button onClick={() => handleDeleteNote(note._id)}>
              Remove Note
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No notes available for this Mentor.</p>
      )}

      {/* Form to Add Note */}
      <h2>Add a New Note</h2>
      {noteError && <p style={{ color: "red" }}>{noteError}</p>}
      <form onSubmit={handleAddNote}>
        <label htmlFor="mentor_name">Overseer Name:</label>
        <input
          type="text"
          id="mentor_name"
          name="mentor_name"
          value={newNote.mentor_name}
          onChange={handleNoteInputChange}
        />
        <br />
        <label htmlFor="notes">Note:</label>
        <textarea
          id="notes"
          name="notes"
          value={newNote.notes}
          onChange={handleNoteInputChange}
        />
        <br />
        <button type="submit">Add Note</button>
      </form>

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
        Remove Mentor
      </button>
    </div>
  );
};

export default StudentDetails;
