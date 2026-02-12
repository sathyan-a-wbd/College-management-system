import React from "react";
import Logo from "../../assets/logo.svg";
import Students from "../../assets/Students.jpg";
import Courses from "../../assets/Courses.svg";
import Subjects from "../../assets/Subjects.svg";
import Batch from "../../assets/Batch.svg";
import { NavLink } from "react-router-dom";
const DashBoard = ({ students, courses, batches, subjects }) => {
  const totalSubjects = subjects.length;
  const totalCourses = courses.length;
  const totalBatch = batches.length;
  const totalStudents = students.length;

  const dashUtils = [
    {
      name: "Toatal Students",
      img: Students,
      count: totalStudents,
      link: "/student-managemant",
    },
    {
      name: "Toatal Subjects",
      img: Subjects,
      count: totalSubjects,
      link: "/subject-management",
    },
    {
      name: "Toatal Courses",
      img: Courses,
      count: totalCourses,
      link: "/courses-management",
    },
    {
      name: "Toatal Batch",
      img: Batch,
      count: totalBatch,
      link: "/batches-management",
    },
  ];
  return (
    <main className="       w-full ">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="logo-field flex flex-col gap-3 items-center mb-5 mt-5">
            <img
              src={Logo}
              alt="students"
              style={{ borderRadius: "50%" }}
              className="w-[100px] h-[100px] rounded-5xl shadow-xl border-1  border-[#4f46e5]"
            />
            <div className="name font-bold">Admin</div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] px-6  gap-8 items center justify-center">
          {/* Card */}
          {dashUtils.map((counts) => (
            <NavLink
              to={counts.link}
              style={{ textDecoration: "none" }}
              className="backdrop-blur-md bg-white/20 border border-white/30 
                rounded-2xl shadow-xl px-5 py-2 "
            >
              <div className=" flex ites-center justify-center">
                <img
                  src={counts.img}
                  alt=""
                  className="w-[150px] md:w-[100px] h-[150px] md:h-[100px]"
                />
              </div>

              <p className=" text-xl text-gray-800 font-semibold">
                {counts.name}
              </p>
              <p className=" text-3xl text-gray-800 font-bold">
                {counts.count}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
