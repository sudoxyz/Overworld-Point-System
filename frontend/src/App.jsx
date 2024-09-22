import { useState, useEffect } from "react";
import request from 'superagent';


const App = () => {


  const apiURL = 'http://localhost:3000';

  function AddStudent(data) {
    const sendData = {
      name: data
    }
    console.log(sendData)
    request
      .post(`${apiURL}/students`)
      .send(sendData) // Send an object with the 'name' property
      .set('Content-Type', 'application/json') // Set the content type (optional, depending on your API)
      .end((err, response) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Response:', response.body);
          // You can handle the response data as needed (e.g., update your UI)
        }
      });
  }

  function Remove(tableData, idData) {
    console.log(tableData, idData)
    request
      .delete(`${apiURL}/${tableData}/${idData}`)
      .end((err, response) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Response:', response.body);
          // You can handle the response data as needed (e.g., update your UI)
        }
      });
  }


  useEffect(() => {
    // Make a GET request to your API to fetch Coins data
    fetch("http://localhost:3000/coins")
      .then((response) => response.json())
      .then((data) => setCoinss(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div>
    </div>
  );
};

export default App;