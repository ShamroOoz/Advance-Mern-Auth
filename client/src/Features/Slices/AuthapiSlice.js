import { GlobalSplitApi } from "../GlobalSplitApi";

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
    googleLogin: builder.mutation({
      query: (body) => ({
        url: "auth/oAuth-login",
        method: "Post",
        body,
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
    verifyEmail: builder.query({
      query: (token) => ({
        url: `auth/verified-email/${token}`,
        method: "get",
        credentials: "include",
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "get",
        credentials: "include",
      }),
    }),
    resendVerifyEmail: builder.mutation({
      query: (body) => ({
        url: "auth/resend-verify-email",
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

    privateData: builder.query({
      query: () => ({ url: "private", method: "get", credentials: "include" }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useResendVerifyEmailMutation,
  useGoogleLoginMutation,
  useVerifyEmailQuery,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenQuery,
  useLazyPrivateDataQuery,
  useLazyLogoutUserQuery,
} = AuthapiSlice;
