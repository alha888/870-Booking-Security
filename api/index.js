import express from "express";
//import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";


import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import mailRoute from "./routes/mail.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });


//middlewares
app.use(cors())
app.use(cookieParser())
//app.use(bodyParser());
app.use(express.json()); //pass para to server with json

//app.use(session());

//middlewares:for different paths with different routers
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/mail", mailRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
    connect();  //connect to Mongo DB
    console.log("Connected to backend! Connected to port 8800");
  });

