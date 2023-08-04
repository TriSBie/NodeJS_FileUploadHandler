const MB = 5; // 5 Megabytes
const FILE_SIZE_LIMIT = MB * 1024; //TOTAL FILE SIZE LIMIT
const fileSizeLimiter = (req, res, next) => {
  const files = req.files;
  const filesOverLimit = [];
  //Which files are over the limit ?
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key]);
    }
  });
  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? "are" : "is";
    const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} 
    over the file size limit of ${MB} MB`.replaceAll(",", ", ");
    const message =
      filesOverLimit.length < 3
        ? sentence.replace(",", "and")
        : sentence.replace(/,(?=[^,]*$)/, "and");
    //mean consists 2 files data only
    res.status(413).json({
      //Payload Too Large
      status: "error",
      message: message,
    });
  }
  next();
};

module.exports = fileSizeLimiter;
