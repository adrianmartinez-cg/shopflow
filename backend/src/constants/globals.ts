export const INTERNAL_SERVER_ERROR = "An internal error occurred.";
export const BAD_REQUEST_ERROR = (details?: string) => {
  return `Invalid data was sent.${details ? ` Details: ${details}` : ""}`;
};
