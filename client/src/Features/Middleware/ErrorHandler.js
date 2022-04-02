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

export const ErrorHandler = (httpStatus, data) => {
  switch (httpStatus) {
    case 409:
      !data?.success && customToast(data?.error);
      break;
    case 400:
      !data?.success && customToast(data?.error);
      break;
    case 401:
      !data?.success && customToast(data?.error);
      break;
    case 403:
      !data?.success && customToast(data?.error);
      break;
    case 404:
      !data?.success && customToast(data?.error);
      window.location.replace("/custom-verified-email");
      break;
    // Other errors, throw an error message directly
    default:
      !data?.success &&
        customToast(" Server Error..Contact website Creator...");
      break;
  }
};
