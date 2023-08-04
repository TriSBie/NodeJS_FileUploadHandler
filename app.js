const fileUpload = require("express-fileupload");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const filesPayloadExists = require("./middleware/filesPayloadExist");
const PORT = process.env.PORT || 5000;
const app = express(); //put the new Express application inside the app variable
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  //must parse to string (sendFile)
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({
    createParentPath: true,
  }),
  filesPayloadExists, //check does res.files already exists
  fileSizeLimiter, // check the limit size of file
  fileExtLimiter([".png", ".jpg", ".jpeg"]), //check whether file extension matches correctly with allowed array extension files.
  (req, res) => {
    //File upload will be accessible from req.files
    const files = req.files;

    Object.keys(files).forEach((key) => {
      //uploadPath = __dirname + /somewhere/on/your/server/ + sampleFile.name
      const filePath = path.join(__dirname, "files", files[key].name);
      // Use the mv() method to place the file somewhere on your server
      files[key].mv(filePath, (err) => {
        if (err) {
          res.status(500).json({
            status: "error",
            message: "File uploaded failed",
          });
        }
      });
    });
    res.json({
      status: "logged",
      message: "logged",
    });
  }
);
app.listen(5000, () => console.log(`Server is running at port ${PORT}`));
