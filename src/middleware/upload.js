const multer = require("multer");
const path = require("path");

/*
Storage Configuration
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  }
});

/*
File Filter
Only PDF allowed
*/
const fileFilter = (req, file, cb) => {
  const fileType = path.extname(file.originalname);

  if (fileType !== ".pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
});

module.exports = upload;