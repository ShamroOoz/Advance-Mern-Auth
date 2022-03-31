import { GlobalSplitApi } from "../GlobalSplitApi";
import { useDispatch } from "react-redux";

export const AuthapiSlice = GlobalSplitApi.injectEndpoints({
  reducerPath: "authApi",
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "Post",
        body,
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "Post",
        body,
        credentials: "include",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/forgotpassword",
        method: "Post",
        body,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetToken, ...rest }) => ({
        url: `auth/passwordreset/${resetToken}`,
        method: "Put",
        body: { ...rest, resetToken },
        credentials: "include",
      }),
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "get",
        credentials: "include",
      }),
    }),

    privateData: builder.query({
      query: () => ({ url: "private", method: "get", credentials: "include" }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useLazyPrivateDataQuery,
  useLazyLogoutUserQuery,
} = AuthapiSlice;
