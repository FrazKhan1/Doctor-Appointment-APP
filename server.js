import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import dbConfig from "./config/dbConfig.js";
import router from "./Routes/useRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import doctorRoute from "./Routes/doctorRoute.js";
import path from "path";
const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use("client/build");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
}
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
