const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email Not Valid");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Password Not Valid");
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: false,
      trim: true,
      enum: ["male", "female"],
    },
    age: {
      type: Date,
      required: false,
      min: "1940/01/01",
      max: "2010/01/01",
    },
    addresses: [
      {
        address: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    userType: {
      type: String,
      required: true,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    userCard: [],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.methods.toJSON = function () {
  const date = this.toObject();
  delete date.__v;
  return date;
};
userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.statics.logMe = async (email, password) => {
  const userDate = await userModel.findOne({ email });
  if (!userDate) throw new Error("Email Or Password Not Ok");
  const isPasswordMatched = await bcrypt.compare(password, userDate.password);
  if (!isPasswordMatched) throw new Error("email Or Password Not Ok");
  return userDate;
};
userSchema.statics.AdminLogin = async (email, password) => {
  const adminData = await userModel.findOne({ email });
  if (!adminData) throw new Error("Email Or Password Not Ok");
  const isPassMatched = await bcrypt.compare(password, adminData.password);
  if (!isPassMatched) throw new Error("Email Or Password Not Ok");
  if (adminData.userType != "admin")
    throw new Error("You Cant Login coz Your Not An Admin");
  return adminData;
};
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};
userSchema.statics.changePassword = async (
  req,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  // console.log(req.password);
  const isOldPasswordMatch = await bcrypt.compare(oldPassword, req.password);
  // console.log(isOldPasswordMatch);
  if (!isOldPasswordMatch) throw new Error("Old Password Not Match");
  if (newPassword != confirmPassword) throw new Error("NewPassword Not Match");
  // newPassword = bcrypt.hash(newPassword, 10);
  // const userData = await userModel.findByIdAndUpdate(req._id, {
  //   password: newPassword,
  // });

  // return userData;
  req.password = await bcrypt.hash(newPassword, 10);
  await req.save();
  return req;
};
const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;
