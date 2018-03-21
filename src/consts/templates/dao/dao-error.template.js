export const accessTokenErrors = {
    TOKEN_DELETE_ERROR: "error occurred while deleting access token",
    TOKEN_FIND_ERROR: (token) =>  `error while trying to find token - ${token}` 
}


export const userError = {
    UNABLE_TO_FIND_USER: (email) => `Error occurred while trying to find user with email - ${email}`
}