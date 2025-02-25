import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    UserName: { type: String, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true , lowercase: true },
    password: { type: String, trim: true }, 
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
