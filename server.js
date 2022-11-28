import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import dbConfig from "./config/dbConfig.js";
import router from "./Routes/useRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import doctorRoute from "./Routes/doctorRoute.js";
import path from "path";
const app = express();
app.set(express.json());
app.set("/api/user", router);
app.set("/api/admin", adminRoute);
app.set("/api/doctor", doctorRoute);
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.set("/", "client/build");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
}
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
