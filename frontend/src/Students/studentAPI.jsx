import request from "superagent";

const apiURL = "http://localhost:3000"; // Your base API URL

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await request.get(`${apiURL}/students`);
    return response.body;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Add a new student
export const addStudent = async (newStudent) => {
  try {
    await request.post(`${apiURL}/students`).send(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Update an existing student
export const updateStudent = async (studentId, updatedData) => {
  try {
    await request.patch(`${apiURL}/students/${studentId}`).send(updatedData);
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Add coins to a student
export const addCoins = async (studentId, addedCoins) => {
  try {
    await request.patch(`${apiURL}/students/add/${studentId}`).send(addedCoins);
  } catch (error) {
    console.error("Error adding coins:", error);
    throw error;
  }
};

// Remove a student
export const removeStudent = async (studentId) => {
  try {
    await request.delete(`${apiURL}/students/${studentId}`);
  } catch (error) {
    console.error("Error removing student:", error);
    throw error;
  }
};

// Fetch notes for a specific student by student_id
export const fetchStudentNotes = async (studentId) => {
  try {
    const response = await request.get(`http://localhost:3000/notes/${studentId}`)
    return response.body;
  } catch (error) {
    console.error("Error fetching student notes:", error);
    throw error;
  }
};

// Add a new note to a student and optionally add coins
export const addNote = async (noteData) => {
  try {
    const response = await request.post(`${apiURL}/notes`).send(noteData);
    return response.body;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

// Delete a note by note ID
export const deleteNote = async (noteId) => {
  try {
    await request.delete(`${apiURL}/notes/${noteId}`);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
