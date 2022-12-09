import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    secret: {
      type: String,
      required: false,
    },
    code6: {
      type: String,
      required: false,
    },
   
    country: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required:false,
    },
    city: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
