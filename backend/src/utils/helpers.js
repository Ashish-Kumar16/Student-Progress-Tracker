export const formatResponse = (data, message = "Success", status = 200) => {
  return {
    status,
    message,
    data,
  };
};

export const handleError = (error, res) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).json(formatResponse(null, message, status));
};