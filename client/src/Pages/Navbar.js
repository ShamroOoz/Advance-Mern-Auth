import React, { useReducer } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { userSelector } from "../Features/Slices/authSlice";
import { useLazyLogoutUserQuery } from "../Features/Slices/AuthapiSlice";

const NavBarLinks = [
  { name: "Home", link: "/", id: 1 },
  { name: "About", link: "about", id: 2 },
  { name: "Contact", link: "contact", id: 3 },
];

const Navbar = () => {
  const { status } = useSelector(userSelector);
  const [trigger, { isSuccess }] = useLazyLogoutUserQuery();

  //Link Active Logic
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
                className={`${
                  show ? "text-gray-500" : "text-blue-500"
                } dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400`}
                aria-label="toggle menu"
              >
                <MenuIcon className="w-6 h-6 fill-current" />
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
              {!status ? (
                <>
                  <NavLink to="login" className={isActive}>
                    Login
                  </NavLink>
                  <NavLink to="register" className={isActive}>
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <Link
                    to="user-profile"
                    type="button"
                    className="flex items-center focus:outline-none"
                    aria-label="toggle profile dropdown"
                  >
                    <div className="w-8 h-8 overflow-hidden  ring-1 rounded-full hover:ring-indigo-700 hover:ring-2 ring-indigo-500">
                      <UserCircleIcon className="object-cover w-full h-full text-gray-700" />
                    </div>
                  </Link>
                  <NavLink
                    to={isSuccess && "/"}
                    type="button"
                    onClick={() => trigger()}
                    className={isActive}
                  >
                    Logout
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
