const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./controller/user.js");
const cors =  require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
};
app.use(bodyParser.json())
app.use(ErrorHandler);
app.use("/api/v2/user", router)
module.exports = app;



/*const express =require("express");
const app =express();
const ErrorHandler = require("./middleware/error");

//config
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/.env",
    });

};

app.use(ErrorHandler);
module.exports=app;

*/











