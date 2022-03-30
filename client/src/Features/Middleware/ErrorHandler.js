import toast from "react-hot-toast";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const customToast = (message) =>
  toast.custom(
    <div className="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
      <div className="flex items-center">
        <ExclamationCircleIcon className="h-7 w-7 mr-6" />
        <p>{message}</p>
      </div>
    </div>
  );

export const ErrorHandler = (httpStatus, { success }) => {
  switch (httpStatus) {
    case 400:
      !success && customToast("Acount with this email already exist..");
      break;
    // 401: not logged in
    // If you are not logged in, jump to the login page and carry the path of the current page
    case 401:
      console.log("You are not logged in, please log in first");
      window.location.reload();
      break;
    //Jump to login page
    case 403:
      console.log("Login expired, please login again'");
      // Clear all cached data
      window.localStorage.clear();
      window.location.reload();
      break;
    // 404request does not exist
    case 404:
      console.log("network request does not exist");
      break;
    // Other errors, throw an error message directly
    default:
      console.log(" don't know what's wrong");
      break;
  }
};
