const multer = require("multer");
const MulterFileStorage = require("./MulterFileStorage");
const { HTTP400Error } = require("../helpers/error");

const storage = new MulterFileStorage();
const upload = multer({
  limits: {
    fieldSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(undefined, true);
    }
    return cb(
      new HTTP400Error("Please provide image file in jpg or jpeg or png."),
      false
    );
  },
  storage,
}).single("image");

module.exports = { upload };
