const multer = require('multer');

const storage = multer.memoryStorage();

const multipleupload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024
  }
});

module.exports = { multipleupload };
