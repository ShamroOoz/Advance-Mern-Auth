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

export const ErrorHandler = (httpStatus, { success, error }) => {
  switch (httpStatus) {
    case 409:
      !success && customToast(error);
      break;
    case 400:
      !success && customToast("credentials Missing....Fill all fields..");
      break;
    case 401:
      !success && customToast(error);
      break;
    // Other errors, throw an error message directly
    default:
      !success && customToast(" Server Error..Contact website Creator");
      break;
  }
};
