/*const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: function (req, file, cb) {
    console.log("file  ,, ", file)
    if (!file) {
      console.error("No file received!");
      return cb(new Error("No file received"), null);
    }
    console.log("Original filename:", file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const parsedName = path.parse(file.originalname).name;
    cb(null, `${parsedName}-${uniqueSuffix}.png`);
  },
});

const pstorage = multer.diskStorage({
  destination: path.join(__dirname, "../products"),  // Corrected destination path
  filename: function (req, file, cb) {
    console.log(req.body);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, `${filename}-${uniqueSuffix}.png`);
  },
});

// Initialize upload object
exports.upload = multer({ storage });
exports.pupload = multer({ storage: pstorage });
*/// backend/multer.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define directories
const uploadsDir = path.join(__dirname, 'uploads');
const productsDir = path.join(__dirname, 'products');

// Create directories if they don't exist
[uploadsDir, productsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Multer storage configuration for general uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    cb(null, `${filename}-${uniqueSuffix}${ext}`);
  },
});

// Multer storage configuration for product images
const pstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    cb(null, `${filename}-${uniqueSuffix}${ext}`);
  },
});

// Initialize upload handlers
const upload = multer({ storage: storage });
const pupload = multer({ storage: pstorage });

module.exports = {
  upload,
  pupload,
};