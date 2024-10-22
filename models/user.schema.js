import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxLength: [50, "Username can't be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be atleast 8 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  // compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // generate JWT TOKEN
  getJwtToken: function () {
    return JWT.sign(
      {
        _id: this._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },
};

export default mongoose.model("User", userSchema);
