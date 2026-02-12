import React, { useState } from "react";

const Course = ({ subjects, courses, setCourses }) => {
  const [courseName, setCourseName] = useState("");
  const [selectedSubjects, setTSelectedSubject] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Slecting subjects
  const toggleSubject = (id) => {
    if (selectedSubjects.includes(id)) {
      setTSelectedSubject(selectedSubjects.filter((s) => s !== id));
    } else {
      setTSelectedSubject([...selectedSubjects, id]);
    }
  };
  //Adding course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      setError("Course name cannot empty");
      return;
    }
    if (selectedSubjects.length < 2) {
      setError("Select at least 2 subjects");
      setSuccess("");
      return;
    }
    const newCourse = {
      id: Date.now(),
      name: courseName,
      subjectIDs: selectedSubjects,
    };

    setCourses([...courses, newCourse]);

    setError("");
    setCourseName("");
    setTSelectedSubject([]);
    setSuccess("Course added successfully");
    setTimeout(() => setSuccess(""), 2000);
  };
  return (
    <main className="w-full flex items-center justify-center">
      <div className="md:w-2/4 w-[90%] sm:w-[90%] mt-5 flex items-center justify-center flex-col">
        <h1 className="text-3xl font-semibold mb-3">Course Management</h1>
        {/* Add course */}
        <form
          onSubmit={handleAddCourse}
          className="flex gap-3 flex-col w-full card py-3 px-6  "
        >
          <h4 className="text-center">Add Course</h4>
          <div className="w-full  ">
            <input
              className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
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

          <label htmlFor="" className="text-xl">
            Select subjects
          </label>
          <div className="pl-1 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
            {subjects.length == 0 ? (
              <>
                <p className="text-red-500">Please add some subjects 1st</p>
              </>
            ) : (
              <>
                {subjects.map((sub) => (
                  <div key={sub.id} className="flex gap-2 items-center">
                    <input
                      className="w-5 h-5"
                      type="checkbox"
                      checked={selectedSubjects.includes(sub.id)}
                      onChange={() => toggleSubject(sub.id)}
                    />
                    {sub.name}
                  </div>
                ))}
              </>
            )}
          </div>

          <div>
            <button
              style={{ borderRadius: "3px" }}
              className="w-full mt-2 bg-[#4f46e5] px-3 py-3 text-white text-xl font-bold rounded-sm"
              type="submit"
            >
              Add Course
            </button>
          </div>
        </form>

        {/* Viewing Course list */}

        <h2 className="text-3xl font-bold mt-4">Courses List</h2>
        {courses.length == 0 ? (
          <>
            <p>No result found !</p>
          </>
        ) : (
          <>
            {courses.map((course) => (
              <div
                key={course.id}
                className="card px-3 flex flex-col gap-3 py-3 w-full mt-3"
              >
                <label className="text-2xl" key={course.id}>
                  {course.name}
                </label>
                <div className="flex gap-2 ">
                  {course.subjectIDs.map((id, i) => {
                    const subs = subjects.find((s) => s.id === id);
                    return (
                      <span
                        className="bg-[#4f46e5] text-white px-1.5 py-1 text-sm rounded-sm"
                        key={i}
                      >
                        {subs?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default Course;
