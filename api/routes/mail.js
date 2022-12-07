import express from "express";
import { sendMail, getUserInfo } from "../controllers/mail.js";

const router = express.Router();

router.post("/sendMail", sendMail);
router.post("/getUserInfo", getUserInfo);

export default router 