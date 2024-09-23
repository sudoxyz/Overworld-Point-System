import { useState, useEffect } from "react";
import request from "superagent";

const App = () => {
  const [students, setStudents] = useState([]); // List of students
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Selected student ID
  const [editStudentId, setEditStudentId] = useState(null); // ID of student being edited
  const [editedStudentData, setEditedStudentData] = useState({
    name: "",
    coins: 0,
  }); // Data for editing
  const [newName, setNewName] = useState("");
  const [newCoins, setNewCoins] = useState(0); // Default initial coins
  const [addedCoins, setAddedCoins] = useState(0);

  const apiURL = "http://localhost:3000"; // Your student API endpoint

  // Function to fetch students from the API
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${apiURL}/students`);
      const studentData = await response.json();
      setStudents(studentData);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle student selection
  const handleStudentSelect = (studentId) => {
    setSelectedStudentId(studentId);
    setEditStudentId(null); // Reset edit state
    setEditedStudentData({ name: "", coins: 0 }); // Clear edit data
  };

  const handleAddStudent = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newName) {
      alert("Please enter a name for the student.");
      return;
    }
    try {
      const response = await request
        .post(`${apiURL}/students`)
        .send({ name: newName, coins: newCoins }); // Send data to API
    } catch (error) {
      console.error(error);
      alert("Error adding student. Please try again.");
    }
  };

  // Function to initiate student edit
  const handleEditStudent = (studentId) => {
    setEditStudentId(studentId);
    const studentToEdit = students.find((student) => student._id === studentId);
    setEditedStudentData({
      name: studentToEdit.name,
      coins: studentToEdit.coins,
    });
  };

  // Function to handle student data changes during editing
  const handleEditInputChange = (event) => {
    console.log(editedStudentData);
    setEditedStudentData({
      ...editedStudentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddInputChange = (event) => {
    console.log(addedCoins);
    setAddedCoins({ ...addedCoins, coins: event.target.value });
  };

  // Function to submit changes and update student details
  const handleUpdateStudent = async (studentId) => {
    try {
      const updatedData = { ...editedStudentData };

      const response = await request
        .patch(`${apiURL}/students/${studentId}`)
        .send(updatedData);

      const updatedStudent = await response.json();
      setStudents(
        students.map((student) =>
          student._id === studentId ? updatedStudent : student
        )
      );

      alert("Student details updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student. Please try again.");
    }
  };
  const handleAddCoins = async (studentId) => {
    try {
      const response = await request
        .patch(`${apiURL}/students/add/${studentId}`)
        .send(addedCoins);

      alert("Added coins successfully!");
    } catch (error) {
      console.error("Error adding coins:", error);
      alert("Error adding coins. Please try again.");
    }
  };
  const handleRemoveStudent = async (studentId) => {
    try {
      const response = await request.delete(`${apiURL}/students/${studentId}`);
      alert("Student removed successfully!");
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error("Error removing student:", error);
      alert("Error removing student. Please try again.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <select
        value={selectedStudentId}
        onChange={(e) => handleStudentSelect(e.target.value)}
      >
        <option value="">Select a student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>

      {selectedStudentId && (
        <div>
          <h2>Selected Student Details:</h2>
          <h3>
            Name: {students.find((s) => s._id === selectedStudentId)?.name}
          </h3>
          <h3>
            Coins: {students.find((s) => s._id === selectedStudentId)?.coins}
          </h3>
          <h3>ID: {students.find((s) => s._id === selectedStudentId)?._id}</h3>
          {editStudentId ? (
            <form onSubmit={() => handleUpdateStudent(editStudentId)}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedStudentData.name}
                onChange={handleEditInputChange}
              />
              <br />
              <label htmlFor="coins">Coins: </label>
              <input
                type="number"
                id="coins"
                name="coins"
                value={editedStudentData.coins}
                onChange={handleEditInputChange}
              />
              <br />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditStudentId(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <button onClick={() => handleEditStudent(selectedStudentId)}>
              Edit
            </button>
          )}
          {editStudentId ? (
            <form onSubmit={() => handleAddCoins(editStudentId)}>
              <label htmlFor="coins">Coins to add: </label>
              <input
                type="number"
                id="coins"
                name="coins"
                value={addedCoins.coins}
                onChange={handleAddInputChange}
              />
              <br />
              <button type="submit">Save Changes</button>
            </form>
          ) : (
            <button onClick={() => handleEditStudent(selectedStudentId)}>
              Add Credits
            </button>
          )}
          {selectedStudentId && (
            <div>
              <button onClick={() => handleRemoveStudent(selectedStudentId)}>
                Remove Student
              </button>
            </div>
          )}
        </div>
      )}
      <h2>Add New Student</h2>
      <form onSubmit={handleAddStudent}>
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
    </div>
  );
};

export default App;
