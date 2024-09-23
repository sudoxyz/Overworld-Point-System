/* eslint-disable react/prop-types */
// src/Students/StudentList.js
// import React from "react";

const StudentList = ({ students, selectedStudentId, onSelectStudent }) => {
  return (
    <select value={selectedStudentId} onChange={(e) => onSelectStudent(e.target.value)}>
      <option value="">Select a student</option>
      
      {students.map((student) => (
        <option key={student._id} value={student._id}>
          {student.name}
        </option>
      ))}
    </select>
  );
};

export default StudentList;
