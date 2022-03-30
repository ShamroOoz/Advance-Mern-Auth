import { GlobalSplitApi } from "../GlobalSplitApi";

export const AuthapiSlice = GlobalSplitApi.injectEndpoints({
  reducerPath: "authApi",
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({ url: "auth/register", method: "Post", body }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation } = AuthapiSlice;
