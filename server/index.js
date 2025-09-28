require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;

const cookieParser = require("cookie-parser");

const cors = require('cors');


app.use(cookieParser());
app.use(express.json());

const allowedOrigin = process.env.allowedOrigin;

app.use(cors({
    origin: allowedOrigin,
    credentials:true
}))

const summaryRouter = require("./Router/summaryRouter");

app.use("/AI",summaryRouter);

app.listen(PORT,()=>console.log("NodeJS Server Started . . . "));
