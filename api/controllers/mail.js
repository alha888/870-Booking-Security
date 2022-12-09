import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import User from "../models/User.js"

import { authenticator } from "otplib";
import QRCode from "qrcode";
import { expressjwt } from "express-jwt";
import bodyParser from "body-parser";


export const getUserInfo = async (req, res, next) => {
  
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));  
        
        let secret = authenticator.generateSecret();
        let code6 = authenticator.generate(secret);
        
        await User.findByIdAndUpdate(
            user._id,
            {$set:{secret:secret,code6:code6}},
            {new:true},
            )
            
            user = await User.findOne({ username: req.body.username });

       res.status(200).json({user})
    
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

        res.status(200).send("Mail send successful!");

  } catch (err) {
    next(err);
  }




};
