import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

import logo from "../../images/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 border-b border-gray-200/50 bg-white md:bg-white/50 backdrop-blur-lg shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to={""}>
            <img className="max-w-40 h-auto" src={logo} alt="The company's logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              <a className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">
                Link
              </a>
              <a className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">
                Link
              </a>
              <a className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">
                Link
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={"register"}
                className="px-5 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-600 font-medium rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                Register
              </Link>
              <Link
                to={"login"}
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-700 border border-gray-300 shadow-sm rounded-lg transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-lg border-b border-gray-200 shadow-md">
            <div className="flex flex-col p-4 space-y-3">
              <a
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              >
                Link
              </a>
              <a
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              >
                Link
              </a>
              <a
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              >
                Link
              </a>
              <hr className="border-gray-200" />
              <Link
                to={"register"}
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-600 font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-center active:scale-98"
              >
                Register
              </Link>
              <Link
                to={"login"}
                onClick={() => setIsOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center active:scale-98"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
