//Handling Errors
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
      status: "fail",
      message: err?.message,
      stack: err?.stack,
    });
  };

  module.export = {errorHandler};