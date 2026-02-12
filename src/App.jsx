import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Subject from "./components/Subject/Subject";
import NavBar from "./components/NavBar/NavBar";
import Course from "./components/Course/Course";
import Batch from "./components/Batch/Batch";
import Student from "./components/Student/Student";
import DashBoard from "./components/Dashboard/DashBoard";

function App() {
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem("subjects");
      if (saved) {
        return JSON.parse(saved);
      }
      return [
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" },
        { id: 3, name: "Javascript" },
        { id: 4, name: "Nodejs" },
      ];
    } catch (error) {
      console.error("Error parsing subjects", error);
      return [];
    }
  });
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("courses");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing course", error);
      return [];
    }
  });
  const [batches, setBatches] = useState(() => {
    try {
      const saved = localStorage.getItem("batches");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing batches", error);
      return [];
    }
  });
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("students");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing students", error);
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("batches", JSON.stringify(batches));
    localStorage.setItem("students", JSON.stringify(students));
  }, [subjects, courses, batches, students]);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Subject subjects={subjects} setSubjects={setSubjects} />}
        />
        <Route
          path="/course-management"
          element={
            <Course
              subjects={subjects}
              setCourses={setCourses}
              courses={courses}
            />
          }
        />
        <Route
          path="/batch-management"
          element={
            <Batch
              courses={courses}
              batches={batches}
              setBatches={setBatches}
            />
          }
        />
        <Route
          path="/student-management"
          element={
            <Student
              courses={courses}
              batches={batches}
              students={students}
              setStudents={setStudents}
            />
          }
        />
        <Route
          path="/dashboard-management"
          element={
            <DashBoard
              subjects={subjects}
              courses={courses}
              batches={batches}
              students={students}
            />
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
