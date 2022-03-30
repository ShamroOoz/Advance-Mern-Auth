import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorHandler } from "./Middleware/ErrorHandler";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token; // getState if we have a another slice in which we have saved token we can access it as well all othe slice data
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
const baseQueryWithIntercept = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log(result, "Interceptor");
  const { data, error } = result;
  //If you encounter an error
  if (error) {
    const { status, data } = error;
    //Handle errors based on status
    ErrorHandler(status, data);
    throw new Error(data?.success);
  }
  if (data) {
    return result;
  }
  throw new Error(data.message);
};

export const GlobalSplitApi = createApi({
  baseQuery: baseQueryWithIntercept, // fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  //Cache time, in seconds, default is 60 seconds
  // keepUnusedDataFor: 2 * 60,
  // refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});
