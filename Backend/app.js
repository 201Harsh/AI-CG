const express = require("express");
const connectToDB = require("./config/db");
connectToDB();
const cors = require("cors");
const Router = require("./routers/user.routes");
const AIRouter = require("./routers/ai.routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", Router);
app.use("/ai", AIRouter);


module.exports = app;
