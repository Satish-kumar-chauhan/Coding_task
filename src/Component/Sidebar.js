import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="fixed left-0 w-1/4 side-nav-bar h-full flex flex-col  py-6 bg-gray-200 shadow-xl justify-start items-left  divide-y divide-red-200">
      <Link
        to="/"
        className="p-4 text-gray-600 hover:text-white hover:bg-gray-700 transition duration-700 ease-in-out"
      >
        <i className="fas fa-home" />
        <span className="text ml-2 text-xs uppercase tracking-wide font-medium">
          Contact
        </span>
      </Link>
      <Link
        to="/maps"
        className="p-4 text-gray-600 hover:text-white hover:bg-gray-700 transition duration-700 ease-in-out"
      >
        <i className="fas fa-ticket-alt" />
        <span className="text ml-2 text-xs uppercase tracking-wide font-medium">
          Charts & Maps
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;
