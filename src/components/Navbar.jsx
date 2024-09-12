// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to={"/"} className="text-xl font-bold">
        My Task Scheduler
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link to="/add-task" className="hover:underline">
            Add Task
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="hover:underline">
            Show All Logs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
