import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import User from "../models/User.js"

import { authenticator } from "otplib";
import QRCode from "qrcode";
import { expressjwt } from "express-jwt";
import bodyParser from "body-parser";


export const getUserInfo = async (req, res, next) => {
  
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));  
        
        const secret = authenticator.generateSecret();
        const code6 = authenticator.generate(secret);

        // const updatedUser = await user.update(
        //     {username: user.username},
        //     {secret:secret,code6:code6},
        //     {new:true},
        // )

        res.status(200).json({user,secret,code6})
    
    } catch (err) {
    next(err);
  }

};






export const sendMail = async (req, res, next) => {
  
    try {
        const transport = nodemailer.createTransport(smtpTransport({
            host: 'smtp.gmail.com', 
            port: 465, // smtp port
            secure: true,
            auth: {
              user: (process.env.AUTH_EMAIL), // sender email
              pass: (process.env.ORTH_PASS),  // SMTP orthpass
            }
        }));

        
        let info = await transport.sendMail({
            from: "Booking <alvinxu@gmail.com>",
            to: `${req.body.email}`,
            subject: 'Please find the 6 digits CODE',
            html: `
            <p>Hello! ${req.body.username}</p>
            <p>You are using Booking service...</p>
            <p>Your Login Authentication CODE is：
               <strong style="color: #ff4e2a;">${req.body.code6}</strong>
            </p>`
        })

  } catch (err) {
    next(err);
  }




};
