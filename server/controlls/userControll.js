const User = require("../models/user");

const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userInfo._id,
      { photo: req.file.path }, // ✅ This should be the correct Cloudinary URL
      { new: true }
    );

    res.status(200).json({
      success: true,
      photo: updatedUser.photo,
      message: "Photo updated successfully",
    });
  } catch (err) {
    console.error("Photo upload error:", err);
    res.status(500).json({ message: "Failed to update photo" });
  }
};

module.exports = { updateProfilePhoto };
