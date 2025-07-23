const express = require("express");
const routes = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  deleteUsersbyId,
  changeUsername,
  changeEmail,
  changePassword,

  getallUsers, // added new route to get all users
} = require("../controlls/auth_controller");

const { authVarfication } = require("../middle_ware/auth_middle");
const upload = require("../middle_ware/upload");
const { updateProfilePhoto } = require("../controlls/userControll");

routes.post(
  "/user/photo",
  authVarfication,
  upload.single("photo"),
  updateProfilePhoto
);
routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/auth", authVarfication, (req, res) => {
  res.json({
    success: true,
    userInfo: req.userInfo,
    message: "welcom to home page",
  });
});
routes.delete("/delete/:id", deleteUsersbyId);
routes.get("/get", getallUsers);
routes.post("/logout", logout);
routes.post("/change-password", authVarfication, changePassword);
routes.post("/change-email", authVarfication, changeEmail);
routes.post("/change-username", authVarfication, changeUsername);
module.exports = routes;
