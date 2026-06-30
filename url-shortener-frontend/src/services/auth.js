import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";

// Register a new user
export const registerUser = async (email, password) => {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
      },
    },
  });
};

// Verify email using OTP
export const verifyUser = async (email, code) => {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
};

// Login
export const loginUser = async (email, password) => {
  return await signIn({
    username: email,
    password,
  });
};

// Logout
export const logoutUser = async () => {
  return await signOut();
};

// Get current logged in user
export const getUser = async () => {
  return await getCurrentUser();
};

// Get JWT Token
export const getToken = async () => {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
};

// Forgot password
export const forgotPassword = async (email) => {
  return await resetPassword({
    username: email,
  });
};

// Confirm new password
export const resetUserPassword = async (email, code, newPassword) => {
  return await confirmResetPassword({
    username: email,
    confirmationCode: code,
    newPassword,
  });
};