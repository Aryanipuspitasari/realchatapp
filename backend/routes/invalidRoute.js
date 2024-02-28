export const invalidRoute = (req, res, next) => {
  console.log(req.url);
  const error = new Error(
    `Combination of path "${req.originalUrl}" and method "${req.method}" not found.`
  );
  error.status = 404;
  next(error);
};
