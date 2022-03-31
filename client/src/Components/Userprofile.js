import React from "react";
import { useLazyPrivateDataQuery } from "../Features/Slices/AuthapiSlice";

const Userprofile = () => {
  const [trigger] = useLazyPrivateDataQuery();

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

        <button
          onClick={() => trigger()}
          className="mt-4 py-1.5 block px-4 transition-colors w-full bg-blue-50 border active:bg-gray-200 font-medium border-gray-200 text-gray-900 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Protected
        </button>
      </div>
    </div>
  );
};

export default Userprofile;
