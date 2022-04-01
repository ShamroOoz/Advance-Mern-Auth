import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorHandler } from "./Middleware/ErrorHandler";
import toast from "react-hot-toast";
import { ShieldCheckIcon } from "@heroicons/react/outline";
import { updateAccessToken } from "./Slices/authSlice";
import { AuthapiSlice } from "./Slices/AuthapiSlice";
import { Mutex } from "async-mutex";

const customToast = (message) =>
  toast.custom(
    <div className="px-8 py-6 bg-green-400 text-white flex justify-between rounded">
      <div className="flex items-center">
        <ShieldCheckIcon className="h-7 w-7 mr-6" />
        {message?.length ? <p>{message} </p> : <p>Success</p>}
      </div>
    </div>
  );

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user?.accessToken; // getState if we have a another slice in which we have saved token we can access it as well all othe slice data
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    return headers;
  },
});

// create a new mutex
const mutex = new Mutex();

const baseQueryWithIntercept = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    api.endpoint !== "refreshToken"
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { url: "/auth/refresh", method: "get", credentials: "include" },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(updateAccessToken(refreshResult.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          let call = await AuthapiSlice.endpoints.logoutUser.initiate();
          return call.unsubscribe;
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  console.log(result, "Interceptor");
  const { data, error } = result;
  //If you encounter an error
  if (error) {
    const { status, data } = error;
    //Handle errors based on status
    ErrorHandler(status, data);
    throw new Error(data?.error);
  }
  if (data) {
    customToast(data?.message);
    return result;
  }
  throw new Error(data?.message);
};

export const GlobalSplitApi = createApi({
  baseQuery: baseQueryWithIntercept,
  //Cache time, in seconds, default is 60 seconds
  // keepUnusedDataFor: 2 * 60,
  // refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});
