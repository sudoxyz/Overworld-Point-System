/* eslint-disable react/prop-types */
// src/Students/StudentDetails.js
import { useEffect, useState } from "react";
import { fetchStudentNotes, addNote, deleteNote } from "../studentApi"; 

const StudentDetails = ({
  student,
  editStudentId,
  editedStudentData,
  onEditStudent,
  onUpdateStudent,
  onEditInputChange,
  onRemoveStudent,
}) => {
  const [notes, setNotes] = useState([]); // State to store notes for the student
  const [newNote, setNewNote] = useState({ mentor_name: "", notes: "" }); // State for new note
  const [noteError, setNoteError] = useState(null);

  // Fetch notes when student is selected
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

  // Handle deleting a note
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId)); // Remove note from UI
    } catch (error) {
      console.error("Error deleting note:", error);
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
        student_id: student._id, // Attach student ID
        coins: parseInt(newNote.coins, 10) || 0, // Ensure coins is an integer
      });

      setNewNote({ mentor_name: "", notes: "", coins: 0 }); // Reset form
      setNoteError(null); // Clear errors

      // Refresh notes
      const updatedNotes = await fetchStudentNotes(student._id);
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
            <p>
            <strong>Coins added:</strong> {note.coins}
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

      {/* Form to add a new note */}
      <h2>Add a New Note</h2>
      {noteError && <p style={{ color: "red" }}>{noteError}</p>}
      <form onSubmit={handleAddNote}>
        <label htmlFor="mentor_name">Mentor Name:</label>
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
        <label htmlFor="coins">Coins to Add:</label>
        <input
          type="number"
          id="coins"
          name="coins"
          value={newNote.coins}
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

      <button onClick={() => onRemoveStudent(student._id)}>
        Remove Mentor
      </button>
    </div>
  );
};

export default StudentDetails;
