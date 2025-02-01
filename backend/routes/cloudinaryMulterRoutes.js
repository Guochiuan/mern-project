import path from "path";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/bmp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only IMAGE files are allowed."), false);
    }
  },
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    // Upload to Cloudinary
    cloudinary.uploader
      .upload_stream(
        {
          // folder: "uploads",
          public_id: `${req.file.fieldname}-${Date.now()}`,
        },
        (error, result) => {
          if (error) {
            return res.status(500).send({ message: error.message });
          }

          res.status(200).send({
            message: "Image uploaded successfully",
            image: result.secure_url,
          });
        }
      )
      .end(req.file.buffer);
  });
});

export default router;
