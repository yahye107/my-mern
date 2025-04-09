const jwt = require("jsonwebtoken");
const user = require("../models/user");

const authVarfication = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, "DEFAULT_SECRET_KEY");
    const userInfo = await user.findById(decoded.userId);

    if (!userInfo) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    // return res.status(200).json({
    //   success: true,
    //   userInfo,
    // });
    req.userInfo = userInfo;
    // Attach user to request
    // req.user = userInfo;
    next(); // ✅ move to next middleware/route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authVarfication };
