import React, { useReducer } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBarLinks = [
  { name: "Home", link: "/", id: 1 },
  { name: "About", link: "/", id: 2 },
  { name: "Contact", link: "/", id: 3 },
];

const Navbar = () => {
  const isActive = ({ isActive }) =>
    [
      "px-2 py-1 mx-2 mt-2 text-sm font-medium  transition-colors duration-200 transform rounded-md md:mt-0  hover:bg-gray-300",
      isActive ? "text-blue-700" : "text-gray-700",
    ]
      .filter(Boolean)
      .join(" ");
  const [show, setShow] = useReducer((state) => !state, true);

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <Link
                className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                to="/"
              >
                Mern Auth
              </Link>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setShow()}
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`flex-1 md:flex md:items-center md:justify-between ${
              show ? "hidden" : "block"
            } `}
          >
            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
              {NavBarLinks.map(({ name, link, id }) => (
                <NavLink key={id} to={link} className={isActive}>
                  {name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <NavLink to="login" className={isActive}>
                Login
              </NavLink>
              <NavLink to="register" className={isActive}>
                Register
              </NavLink>
              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>

                <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
                  Khatab wedaa
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
