import CustomError from "../CustomError/CustomError";

const apiKeyErrors: Record<string, CustomError> = {
  invalidApiKeyError: new CustomError(
    "Invalid Api Key",
    401,
    "Invalid Api Key"
  ),
};

export default apiKeyErrors;
