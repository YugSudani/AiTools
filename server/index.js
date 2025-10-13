require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;

const cookieParser = require("cookie-parser");

const cors = require('cors');

const { connectDB } = require("./connectDB");
const mongoURI = process.env.mongoURI;

connectDB(mongoURI);

app.use(cookieParser());
app.use(express.json());

const allowedOrigin = process.env.allowedOrigin;

app.use(cors({
    origin: allowedOrigin,
    credentials:true
}))

const AI_Router = require("./Router/AI_Router");
const userrouter = require('./Router/userRouter');
const adminRouter = require('./Router/adminRouter');
const isLogin = require("./middlewares/isLogin");
const isAdmin = require('./middlewares/isAdmin');

app.use("/user",userrouter);
app.use("/AI",isLogin,AI_Router); // summary router constains all AI API
app.use("/admin",isAdmin,adminRouter); 

app.listen(PORT,()=>console.log("NodeJS Server Started . . . "));
