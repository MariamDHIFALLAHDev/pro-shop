import { createSelector } from "reselect";

const user = (state) => state.user;
const userDetails = (state) => state.userDetails;
const userUpdateProfile = (state) => state.userUpdateProfile;

export const userInfoSelector = createSelector(user, (user) => ({
  userInfo: user.userInfo,
  isLoading: user.isLoading,
  error: user.error,
}));

export const userDetailsSelector = createSelector(
  userDetails,
  (userDetails) => ({
    user: userDetails.user,
    isLoading: userDetails.isLoading,
    error: userDetails.error,
  })
);

export const userUpdateProfileSelector = createSelector(
  userUpdateProfile,
  (userUpdate) => ({
    success: userUpdate.success,
  })
);
