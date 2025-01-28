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












const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(cookieParser());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
};
//import Routes
const user = require("./controller/user.js");

app.use("/api/v2/user", user);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;