const joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Quote = require("../models/qoute");
const generateToken = (userId) => {
  return jwt.sign({ userId }, "DEFAULT_SECRET_KEY", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
// validate register//
const registerSchema = joi.object({
  firstname: joi.string().min(2).required(),
  lastname: joi.string().min(2).required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  gender: joi.string().valid("Male", "Female").required(),
  age: joi.number().min(8).max(120).required(),
  password: joi.string().required(),
  role: joi.string().valid("Admin", "User"),
});

// validate login//
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
////userregister
const registerUser = async (req, res, next) => {
  const { firstname, lastname, username, email, gender, age, password, role } =
    req.body;

  const { error } = registerSchema.validate({
    firstname,
    lastname,
    username,
    email,
    gender,
    age,
    password,
    role,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const checkIfEmailAndUsernameisAlreadyExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (checkIfEmailAndUsernameisAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    // Store raw password for later use (e.g., sending email)
    const rawPassword = password;

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const newlyCreateduser = await User.create({
      firstname,
      lastname,
      username,
      email,
      gender,
      age,
      password: hashedPassword,
      rawPassword: rawPassword, // <-- store it
      role: role || "User",
    });

    if (newlyCreateduser) {
      const Token = generateToken(newlyCreateduser?._id);
      res.cookie("token", Token, {
        withCredentials: true,
        httpOnly: true,
      });

      // Send response including raw password if needed (e.g., for admin access or sending via email)
      res.json({
        success: true,
        message: "User registered successfully",
        userData: {
          id: newlyCreateduser._id,
          firstname: newlyCreateduser.firstname,
          lastname: newlyCreateduser.lastname,
          username: newlyCreateduser.username,
          email: newlyCreateduser.email,
          gender: newlyCreateduser.gender,
          age: newlyCreateduser.age,
          role: newlyCreateduser.role,
          rawPassword, // ⚠️ Optional: remove in production or secure environments
        },
      });
    }
  } catch (error) {
    console.log("Error registering", error);
  }
};

/////userlogin
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, getUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = generateToken(getUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    res.json({
      success: true,
      message: "User logged in successfully",
      token,
      userData: {
        id: getUser._id,
        firstname: getUser.firstname,
        lastname: getUser.lastname,
        username: getUser.username,
        email: getUser.email,
        gender: getUser.gender,
        age: getUser.age,
        role: getUser.role,
      },
    });
  } catch (error) {
    console.log("Error registering", error);
  }
};
const logout = async (req, res) => {
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false,
  });
  return res.status(200).json({
    success: true,
    message: "User logged out",
  });
};
//get all users
const getallUsers = async (req, res) => {
  try {
    const getallUsers = await User.find({});
    if (getallUsers.length > 0) {
      res.json({
        success: true,
        message: "Users fetched successfully",
        users: getallUsers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
  } catch (error) {
    console.log("Error getting users", error);
  }
};
//delete users
const deleteUsersbyId = async (req, res) => {
  try {
    const deleteUserById = req.params.id;
    const deleteduser = await User.findByIdAndDelete(deleteUserById);
    if (deleteduser) {
      await Quote.deleteMany({ userId: deleteduser._id });
      res.status(200).json({
        success: true,
        data: deleteduser,
        message: "user deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log("the deleting ha been failed", error);
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo._id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing the password",
    });
  }
};
const changeEmail = async (req, res) => {
  try {
    const user = await User.findById(req.userInfo._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });

    user.email = req.body.email;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const changeUsername = async (req, res) => {
  try {
    const user = await User.findById(req.userInfo._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    user.username = req.body.username;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logout,
  getallUsers,
  deleteUsersbyId,
  changeEmail,
  changeUsername,
  changePassword,
};
