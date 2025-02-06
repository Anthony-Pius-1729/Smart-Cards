import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/rb_518.png";

const Navbar = () => {
  return (
    <nav className="bg-[#2152b3] rounded-2xl">
      <div className="flex justify-between items-center py-4">
        <div>
          <img src={logo} alt="Logo" className="w-20"></img>
        </div>
        <div className="flex justify-between items-center space-x-4 mr-32">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/library" className="hover:text-blue-200">
            Library
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>
          <Link to="/contact-us" className="hover:text-blue-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
