const path = require("path");
const fileExtLimiter = (allowedExtArray) => {
  //return a middleware callback function
  return (req, res, next) => {
    const files = req.files;
    const filesExtension = [];
    Object.keys(files).forEach((key) => {
      //Create an array files contain an extension parsed from path.ext(given name)
      filesExtension.push(path.extname(files[key].name));
    });
    //Are the file extension allowed ? => using every to check whether one of each values contains
    const allowed = filesExtension.every((ext) =>
      allowedExtArray.includes(ext)
    );
    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files are allowed.`.replaceAll(
          ",",
          ", "
        );
      //payment required : code is not defined
      res.status(402).json({
        status: "error",
        message: message,
      });
    }
    next();
  };
};
module.exports = fileExtLimiter;
