const UserProfile = require("../models/profileUser");

// Post Method
async function ProfileUser(req, res) {
  try {
    const { userName, role, mobileNumber, gender } = req.body;

    const newProfile = new UserProfile({
      userName,
      role,
      mobileNumber,
      gender,
    });

    const saveProfile = await newProfile.save();
    res.status(200).json({
      data: [saveProfile],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "All fields are required",
    });
  }
}

// Get Method

async function getAllProfile(req, res) {
  try {
    const allProfile = await UserProfile.find();
    res.status(200).json({
      data: allProfile,
    });
  } catch (error) {
    res.status(500).json({
      statu: "error",
      code: 500,
      message: "Failed to get all userProfile",
    });
  }
}

// Get Method using by id
async function getUserProfile(req, res) {
  try {
    const { id } = req.params;

    const userProfile = await UserProfile.findById(id);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({
      statu: "error",
      code: 500,
      message: "Failed to get userProfile",
    });
  }
}

// PUT Method

async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const { userName, role, mobileNumber, gender } = req.body;
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      id,
      { userName, role, mobileNumber, gender },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User profile not found",
      });
    }
    res.status(200).json({
      data: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to update user profile",
    });
  }
}
// PATCH Method
async function upataingProfileDetails(req, res) {
  try {
    const { id } = req.params;
    const { userName, role, mobileNumber, gender } = req.body;
    const updatingProfile = await UserProfile.findByIdAndUpdate(
      id,
      { $set: { userName, role, mobileNumber, gender } },
      { new: true }
    );
    if (!updatingProfile) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User profile not found",
      });
    }
    res.status(200).json({
      data: updatingProfile,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to update user profile",
    });
  }
}

// Delete

async function userDeleteProfile(req, res) {
  try {
    const { id } = req.params;

    const userProfile = await UserProfile.findByIdAndDelete(id);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({
      statu: "error",
      code: 500,
      message: "Failed to delete userProfile",
    });
  }
}

module.exports = {
  ProfileUser,
  getAllProfile,
  getUserProfile,
  updateProfile,
  upataingProfileDetails,
  userDeleteProfile,
};
