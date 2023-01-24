const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + "--" + file.originalname);
    let fileName = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + "--" + fileName);
  },
});

const upload = multer({ storage:fileStorageEngine });

module.exports = upload;