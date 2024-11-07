import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback && callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 } // 5MB
// }).single('file');

export default upload;
