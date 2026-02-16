import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Student = ({ courses, batches, setStudents, students }) => {
  const [studentName, setStudentName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const searchedStudent = students.filter((stud) =>
    stud.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const filterBatch = batches.filter(
    (btch) => btch.courseID === selectedCourse,
  );
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError("Student name cannot be empty");
      return;
    }
    if (!selectedCourse.trim()) {
      setError("Please select a course");
      return;
    }

    if (!selectedBatch.trim()) {
      setError("Please select a batch");
      return;
    }
    //Existing ?
    const isDuplicate = students.some(
      (stu) =>
        stu.name.toLowerCase() === studentName.trim().toLowerCase() &&
        stu.batchID === selectedBatch,
    );
    if (isDuplicate) {
      setError("Student already exists");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: studentName,
      courseID: selectedCourse,
      batchID: selectedBatch,
    };
    setStudents([...students, newStudent]);

    setError("");
    setSuccess("Student added successfully");
    setTimeout(() => setSuccess(""), 2000);
    setStudentName("");
    setSelectedCourse("");
    setSelectedBatch("");
  };
  const handleDelete = (id) => {
    setStudents(students.filter((stu) => stu.id !== id));
  };
  const courseMap = Object.fromEntries(courses.map((c) => [c.id, c]));

  const batchMap = Object.fromEntries(batches.map((b) => [b.id, b]));
  return (
    <main className="w-full flex gap-10 flex-col px-10 mt-10 items-center ">
      <div className="w-full lg:w-2/4 md:w-full sm:w-full">
        <form
          onSubmit={handleAddCourse}
          className="flex gap-3 flex-col w-full card py-3 px-6  "
        >
          <h4 className="text-center">Add Student</h4>
          <div className="w-full  ">
            <input
              className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                setError("");
              }}
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
          >
            <option value="">Select course</option>
            {courses.map((crs) => (
              <option key={crs.id} value={crs.id}>
                {crs.name}
              </option>
            ))}
          </select>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
          >
            <option value="">Select batch</option>
            {filterBatch.map((fb) => (
              <option key={fb.id} value={fb.id}>
                {fb.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{ borderRadius: "3px" }}
            className="w-full mt-2 bg-[#4f46e5] px-3 py-3 text-white text-xl font-bold rounded-sm"
          >
            Add Student
          </button>
          {error ? (
            <>
              <p className="text-xs mt-1 px-1 text-[#dc2626]">
                {error && error}
              </p>
            </>
          ) : (
            <></>
          )}
          {success ? (
            <>
              <p className="text-xs mt-1 px-1 text-[#16a34a]">
                {success && success}
              </p>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
      <div className="w-full md:w-2/4 flex flex-col gap-2">
        <div className="input-field flex border-1 w-full rounded-sm items-center justify-center border-[#4f46e5] px-3">
          <input
            type="text"
            placeholder="Search Students"
            className=" flex-1 outline-none px-1 py-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch className="font-bold cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full  px-0 md:px-4 sm:px-4 items-start ">
        {searchedStudent.length === 0 ? (
          <p className="text-red-500">No results found</p>
        ) : (
          searchedStudent.map((student) => {
            const course = courseMap[student.courseID];
            const batch = batchMap[student.batchID];

            return (
              <div
                key={student.id}
                className="flex overflow-x-auto flex-col font-montserrat backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl w-full rounded-2xl p-4"
              >
                <h2 className="text-xl text-[27px]">{student.name}</h2>
                <span>
                  <b>Course:</b> {course?.name}
                </span>
                <span>
                  <b>Batch:</b> {batch?.name}
                </span>
                <span>
                  Time: {batch?.sTime}-{batch?.eTime}
                </span>
                <div>
                  <button
                    style={{ borderRadius: "5px" }}
                    className="text-white py-1 px-2 rounded-lg bg-[#dc2626]"
                    onClick={() => handleDelete(student.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })
        )}{" "}
      </div>
    </main>
  );
};

export default Student;
