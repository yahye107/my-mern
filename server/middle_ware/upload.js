const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();
    const isDocument = ["pdf", "doc", "docx", "xls", "xlsx"].includes(ext);

    // Determine resource type
    const resourceType = isDocument ? "raw" : "image";
    const nameWithoutSpaces = file.originalname.replace(/\s+/g, "_");
    return {
      folder: "user_photos",
      resource_type: resourceType, // Use 'raw' for documents
      access_mode: "public",
      use_filename: true,
      unique_filename: false,

      public_id: `${Date.now()}-${nameWithoutSpaces}`,
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
