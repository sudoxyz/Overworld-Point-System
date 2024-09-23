import { useState, useEffect } from "react";
import { fetchStudents, addStudent, updateStudent, addCoins, removeStudent } from "./Students/studentApi";
import StudentList from "./Students/UI/studentList";
import StudentDetails from "./Students/UI/studentDetails";
import StudentForm from "./Students/UI/studentForm";

const App = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [editStudentId, setEditStudentId] = useState(null);
    const [editedStudentData, setEditedStudentData] = useState({ name: "", coins: 0 });
    const [addedCoins, setAddedCoins] = useState({ coins: 0 }); // State to track added coins
  
    useEffect(() => {
      const loadStudents = async () => {
        const studentData = await fetchStudents();
        setStudents(studentData);
      };
      loadStudents();
    }, []);
  
    const handleAddStudent = async (newStudent) => {
      await addStudent(newStudent);
      setStudents(await fetchStudents());
    };
  
    const handleUpdateStudent = async (studentId) => {
      await updateStudent(studentId, editedStudentData);
      setStudents(await fetchStudents());
      setEditStudentId(null);
    };
  
    const handleAddCoins = async (studentId) => {
      await addCoins(studentId, addedCoins);
      setStudents(await fetchStudents());
      setAddedCoins({ coins: 0 }); // Reset after adding coins
    };
  
    const handleAddInputChange = (e) => {
      setAddedCoins({ coins: Number(e.target.value) });
    };
  
    const handleRemoveStudent = async (studentId) => {
      await removeStudent(studentId);
      setStudents(await fetchStudents());
    };
  
    const selectedStudent = students.find((s) => s._id === selectedStudentId);
  
    return (
      <div>
        <h2>Students</h2>
        <StudentList students={students} selectedStudentId={selectedStudentId} onSelectStudent={setSelectedStudentId} />
        <hr />
        {selectedStudentId && (
          <StudentDetails
            student={selectedStudent}
            editStudentId={editStudentId}
            editedStudentData={editedStudentData}
            onEditStudent={setEditStudentId}
            onUpdateStudent={handleUpdateStudent}
            onEditInputChange={(e) => setEditedStudentData({ ...editedStudentData, [e.target.name]: e.target.value })}
            onAddCoins={handleAddCoins}
            addedCoins={addedCoins}
            onAddInputChange={handleAddInputChange}
            onRemoveStudent={handleRemoveStudent}
          />
        )}
  
        <h2>Add New Student</h2>
        <StudentForm onAddStudent={handleAddStudent} />
      </div>
    );
  };
  
  export default App;