# Student Management App

This is a student management system with front-end and back-end components. It allows users (like mentors) to manage students, add notes with the option to add coins, and track how many coins were added with each note.

# Table of Contents

    Project Overview
    Tech Stack
    Features
    Front-End Setup
    Back-End Setup
    API Endpoints
    Future Improvements

# 1. Project Overview

The Student Management App allows for managing students, tracking coins, and adding notes. Mentors can create students, update their details, and add notes along with coins to a selected student.

# 2. Tech Stack
Front-End:

    React.js
    Superagent (for API requests)

Back-End:

    Node.js
    Express.js
    MongoDB (using Mongoose)

# 3. Features
Front-End:

    View a list of students.
    Select a student to view their details.
    Add/edit students, including their name and coin count.
    Add notes to students, with the ability to add coins alongside the note.
    Remove notes and students.

Back-End:

    REST API to manage students and notes.
    CRUD functionality for students and notes.
    Coin-tracking with notes.

# 4. Front-End Setup
## Prerequisites:

    Node.js and npm installed.

## Installation:

### Clone the repository.

    git clone https://github.com/sudoxyz/Overworld-Point-System.git
    cd Overworld-Point-System

### Navigate to the front-end directory:

    cd frontend

### Install dependencies:

    npm install

### Start the development server:

    npm start

## Front-End Structure:

    frontend/
    ├── src/
    │   ├── Students/
    │   |   ├── UI/
    |   │   │   ├── StudentList.js   # Note creation & all mentor details
    |   │   │   ├── StudentDetails.js   # Creation of mentor
    |   │   │   └── AddStudentForm.js   # Selction of mentor
    │   |   └── studentAPI.jsx   # Handles API requests from frontend
    │   └── App.jsx   # Main app component
    │   └── App.css   # CSS for base app   
    ├── public/
    └── README.md

# 5. Back-End Setup
## Prerequisites:

    Node.js and npm installed.
    MongoDB installed and running locally or via a cloud service (e.g., MongoDB Atlas).

## Installation:

## Navigate to the back-end directory:

    cd backend

### Install dependencies:

    npm install

### Change env

    Rename .env.example to .env
    Change default values

### Start the development server:

    npm run dev

## Back-End Structure:

    backend/
    ├── models/
    │   ├── students.js   # Student schema
    │   └── notes.js   # Notes schema
    ├── routes/
    │   ├── Students.js   # Student routes
    │   └── Notes.js   # Notes routes
    ├── .env.example 
    └── api.js   # Main entry point

# 6. API Endpoints
## Student Routes:

    GET /students: Get all students.
    POST /students: Create a new student.
    PATCH /students/:id: Update a student's details.
    PATCH /students/add/:id: Add coins to a student.
    DELETE /students/:id: Delete a student.

## Notes Routes:

    GET /notes: Get all notes.
    GET /notes/student/:student_id: Get all notes for a specific student.
    POST /notes: Add a new note (can include coins).
    DELETE /notes/:id: Delete a note by its ID.


# 7. Todo
   
    Add styling
    Extra Visuals (such as graphs)
    Reward tracking (point count downs)
    User authentication and authorization for mentors.
    Pagination for students and notes.
    Advanced search and filtering for students based on criteria (e.g., coins).
    Exporting data (e.g., student details and notes) as CSV or PDF.

