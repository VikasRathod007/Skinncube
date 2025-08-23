import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    console.log('Multer processing file:', file.originalname);

    // Store the path relative to the public directory for frontend access
    const relativePath = `temp/${file.originalname}`;
    console.log('Storing file with relative path:', relativePath);

    cb(null, file.originalname);
  }
})

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});