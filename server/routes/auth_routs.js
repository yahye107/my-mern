const express = require("express");
const routes = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  deleteUsersbyId,
  getallUsers, // added new route to get all users
} = require("../controlls/auth_controller");

const { authVarfication } = require("../middle_ware/auth_middle");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/auth", authVarfication, (req, res) => {
  res.json({
    success: true,
    user: req.user, // thanks to authVarfication
    message: "welcom to home page",
  });
});
routes.delete("/delete/:id", deleteUsersbyId);
routes.get("/get", getallUsers);
routes.post("/logout", logout);

module.exports = routes;
