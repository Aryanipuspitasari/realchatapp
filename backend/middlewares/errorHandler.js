export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
  
    console.error(
      `Name: ${err.name}\n
      Message: ${err.message}\n
      Status: ${status}`
    );
  
    res.status(status).send(err.message);
  };
  