import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Doctor from "../Models/doctorModel.js";
const router = express.Router();

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });

    res.status(200).send({
      message: "Doctor info fetch Successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );

    res.status(200).send({
      message: "Doctor info Update Successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false });
  }
});

export default router;
