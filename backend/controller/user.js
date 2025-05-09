// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const User = require("../model/user");
// const router = express.Router();
// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const bcrypt = require("bcryptjs");
// const { upload } = require("../multer");
// require("dotenv").config();

// router.post("/", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
//     // console.log("file to be visible", req.body)
//     console.log("Creating user...");
//     const { name, email, password } = req.body;

//     // console.log("files",  req.body.file)

//     const userEmail = await User.findOne({ email });
//     if (userEmail) {
//         // console.log("check1", req.body.file)
//         if (true) {
//             const filepath = path.join(__dirname, "../uploads", req.file.filename);
//             try {
                
//                 console.log("check 2")

//                 fs.unlinkSync(filepath);
//             } catch (err) {
//                 console.log("Error removing file:", err);
//                 return res.status(500).json({ message: "Error removing file" });
//             }
//         }
//         // return next
//         // return next(new ErrorHandler("User already exists", 400));  // This now works correctly
//     }

//     console.log("check 3")

//     let fileUrl = "";
//     if (req.file) {
//         fileUrl = path.join("./uploads", req.file.filename);
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("At Create ", "Password: ", password, "Hash: ", hashedPassword);
//     const user = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         avatar: {
//             public_id: req.file?.filename || "",
//             url: fileUrl,
//         },
//     });
//     console.log(user);
//     res.status(201).json({ success: true, user });
// }));
// module.exports = router;
const express = require("express");
const path = require("path");
const fs = require("fs");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require("bcryptjs");
require("dotenv").config();


router.post("/create-user", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    console.log("Creating user...");
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
        if (req.file) {
            const filepath = path.join(__dirname, "../uploads", req.file.filename);
            try {
                fs.unlinkSync(filepath);
            } catch (err) {
                console.log("Error removing file:", err);
                return res.status(500).json({ message: "Error removing file" });
            }
        }
        return next(new ErrorHandler("User already exists", 400));
    }

    let fileUrl = "";
    if (req.file) {
        fileUrl = path.join("uploads", req.file.filename);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("At Create ", "Password: ", password, "Hash: ", hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: {
            public_id: req.file?.filename || "",
            url: fileUrl,
        },
    });
    console.log(user)
    res.status(201).json({ success: true, user });
}));

router.post("/login", catchAsyncErrors(async (req, res, next) => {
    console.log("Logging in user...");
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log("At Auth", "Password: ", password, "Hash: ", user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    user.password = undefined;
    res.status(200).json({
        success: true,
        user,
    });
}));

module.exports = router;