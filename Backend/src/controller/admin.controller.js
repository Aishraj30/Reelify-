const adminmodel = require("../model/admin.model"); // ✅ correct model import

const getadminbyid = async (req, res) => {
  try {
    const adminId = req.params.id;

    //   if (!ObjectId.isValid(adminId)) {
    //   return res.status(400).json({ message: "Invalid admin id" });
    // }

    const admin = await adminmodel.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      message: "Admin found",
      admin,
    });
  } catch (error) {
    console.error("Error in getadminbyid:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getadminbyid,
};
