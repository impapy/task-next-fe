import * as R from "ramda";

export const getErrorMessage = R.pipe(
  R.pathOr("Error: No message available", ["response", "data", "message"]), // Default text if message is missing
  R.ifElse(Array.isArray, R.head, R.identity) // If array, return first element; otherwise, return as is
);
