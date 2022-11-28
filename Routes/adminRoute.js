import express from "express";
import User from "../Models/userModel.js";
import Doctor from "../Models/doctorModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors Fetched Successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Doctor Data", success: false, error });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users Fetched Successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Users Data", success: false, error });
  }
});

router.post("/change-doctor-status", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });

    const user = await User.findOne({ _id: doctor.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `You doctor account has been ${status}`,
      onClikPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(200).send({
      message: "Doctor status changed successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Users Data", success: false, error });
  }
});

export default router;
