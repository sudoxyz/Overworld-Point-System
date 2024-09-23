// src/Students/studentApi.js
import request from "superagent";

const apiURL = "http://localhost:3000";

export const fetchStudents = async () => {
  try {
    const response = await fetch(`${apiURL}/students`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const addStudent = async (newStudent) => {
  try {
    await request.post(`${apiURL}/students`).send(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

export const updateStudent = async (studentId, updatedData) => {
  try {
    const response = await request
      .patch(`${apiURL}/students/${studentId}`)
      .send(updatedData);
    return await response.json();
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const addCoins = async (studentId, addedCoins) => {
  try {
    await request.patch(`${apiURL}/students/add/${studentId}`).send(addedCoins);
  } catch (error) {
    console.error("Error adding coins:", error);
    throw error;
  }
};

export const removeStudent = async (studentId) => {
  try {
    await request.delete(`${apiURL}/students/${studentId}`);
  } catch (error) {
    console.error("Error removing student:", error);
    throw error;
  }
};
