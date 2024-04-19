import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import SalleImage from "../models/salleImages.js"; // Import the SalleImage model
import fs from "fs";


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer middleware for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../assets/images')); // Specify the absolute path where uploaded files should be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for the uploaded file
    }
});

const upload = multer({ storage: storage });

// Route for uploading files
router.post("/upload", upload.single('image'), async (req, res, next) => {
    // Pass the uploaded file to the next middleware (addSalle function)
    req.uploadedFile = req.file;
    console.log(req.uploadedFile);
    const image = req.uploadedFile; // Access the uploaded file from req.uploadedFile
       try{     // Check if image is provided
            if (!image) {
                return res.status(400).json({
                    status: "error",
                    message: "No image uploaded",
                });
            }
    
            // Read image data from file
            const imageData = fs.readFileSync(image.path);
    
            // Save the image data in SalleImage collection
            const salleImage = new SalleImage({
                data: imageData,
                contentType: image.mimetype,
            });
            const savedSalleImage = await salleImage.save();
            res.status(200).json({
                status: "success",
                message: "Image saved successfully",
                data: savedSalleImage,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: "Database Error",
            });
        }
        next();
});

export default router;
