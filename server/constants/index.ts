export const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    severity: 5,
    silly: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "green",
    verbose: "blue",
    severity: "purple",
    silly: "purple",
  },
};

export const HTTP_RESPONSE_CODE = {
  NOT_FOUND: 404,
  CREATED: 201,
  CONFLICT: 409,
  TOO_MANY_REQUEST: 429,
  BAD_REQUEST: 400,
  OK: 200,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
  FORBIDDEN: 403,
};

export const enum HttpStatusCode {
  NOT_FOUND = 404,
  CREATED = 201,
  CONFLICT = 409,
  TOO_MANY_REQUEST = 429,
  BAD_REQUEST = 400,
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
  FORBIDDEN = 403,
}

export const APP_MESSAGE = {
  serverError: "An unexpected error occured. Please try again later.",
  success: "Success",

  missingRequiredField: "Missing required fields.",
  passwordsMismatch: "Password and confirm password does not match.",
  usernameDuplicated: "User with this username already exists.",
  emailDuplicated: "User with this email address already exists.",
  invalidCredentials: "Invalid email or password.",
  invalidToken: "Invalid or expired token.",
  userUnauthorized:
    "User is not authorized. Please log in to access this resources.",

  userLoggedIn: "User successfully logged in.",
  userRegistered: "User successfully registered.",
  passwordResetEmail:
    "If an account exists with this email, you will receive a reset link.",
  passwordResetSuccessful: "Password successfully reset.",

  skillSaved: "Skill added successfully.",
  skillNotFound: "Skill not found.",
  skillDeleted: "Skill deleted successfully.",
  skilLEdited: "Skill updated successfully.",

  resourceSaved: "Resource added successfully.",
};
