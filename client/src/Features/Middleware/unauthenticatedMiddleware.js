import { isRejectedWithValue } from "@reduxjs/toolkit";

export const unauthenticatedMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      // dispatch(resetStateAction());
      console.log("Unautorize user");
    }

    return next(action);
  };
