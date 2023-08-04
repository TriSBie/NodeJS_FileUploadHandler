//create multiple middleware or 1 middleware can be use for each routes
const filesPayloadExists = (req, res, next) => {
  if (!req.files) {
    res.status(400).json({
      status: "error",
      message: "Missing files",
    });
  }
  next();
};
module.exports = filesPayloadExists;
