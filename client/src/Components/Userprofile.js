import React from "react";

const Userprofile = () => {
  return (
    <div className="max-w-xs mx-auto overflow-hidden mt-9 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-cover w-full h-56 block"
        src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="avatar"
      />

      <div className="py-5 text-center">
        <span className="block text-2xl font-bold text-gray-800 dark:text-white">
          John Doe
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Software Engineer
        </span>
      </div>
    </div>
  );
};

export default Userprofile;
