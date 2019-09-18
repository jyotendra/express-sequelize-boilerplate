export const userError = {
  UNABLE_TO_FIND_USER: email =>
    `Error occurred while trying to find user with email - ${email}`,

  UNABLE_TO_SIGNUP_USER: model => `Unable to sign user up with model: ${model}`,

  UNABLE_TO_SAVE_IN_VERIFICATION: model => `Unable to save user in verification table. Model: ${model}`,

  UNABLE_TO_ACTIVATE_USER: token => `Unable to activate user for accessToken ${token}`,

  USER_ALREADY_VERIFIED:  "User is already verified",

  INVALID_ACCESS_TOKEN: "Invalid access token or token doesn't exist"
};
