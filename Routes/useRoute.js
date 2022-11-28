import express from "express";
import User from "../Models/userModel.js";
import Doctor from "../Models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User Already exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: "User Created Success", success: true });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "password does not match", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Successfully Login", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error logging in", success: false });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      return res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false });
  }
});

router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "notification",
      message: `${newDoctor.firstName}  ${newDoctor.lastName} has Applied for Doctor`,
      data: {
        id: newDoctor._id,
        Name: `${newDoctor.firstName}  ${newDoctor.lastName}`,
      },
      onClickPath: "/admin/doctorlist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res
      .status(200)
      .send({ message: "Apply for doctor Success", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Applying Doctor", success: false });
  }
});

router.post(
  "/mark-all-notifications-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        message: "All Notification marked as seen successfully",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Applying Doctor", success: false });
    }
  }
);

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.unseenNotifications = [];
    user.seenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "All Notification deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Applying Doctor", success: false });
  }
});
export default router;
