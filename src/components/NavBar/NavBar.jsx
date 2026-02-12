import { NavLink } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition duration-200 px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-white text-[#4f46e5]" : "text-white hover:bg-white/10"
    }`;

  return (
    <header className="bg-[#4f46e5] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold tracking-wide">
          College Management
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            style={{ textDecoration: "none" }}
            to="/"
            className={navLinkClass}
          >
            Subject
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/course-management"
            className={navLinkClass}
          >
            Course
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/batch-management"
            className={navLinkClass}
          >
            Batch
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/student-management"
            className={navLinkClass}
          >
            Student
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/dashboard-management"
            className="text-white hover:text-yellow-300 transition duration-200"
          >
            <TbLayoutDashboardFilled size={26} />
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 justify-left bg-[#4f46e5]">
          <NavLink
            style={{ textDecoration: "none" }}
            to="/"
            className={navLinkClass}
          >
            Subject
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/course-management"
            className={navLinkClass}
          >
            Course
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/batch-management"
            className={navLinkClass}
          >
            Batch
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/student-management"
            className={navLinkClass}
          >
            Student
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/dashboard-management"
            className={navLinkClass}
          >
            Dashboard
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default NavBar;
