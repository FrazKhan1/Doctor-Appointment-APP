import mongoose from "mongoose";
const uri = "mongodb+srv://fraz:Perplex@cluster0.b7fiv6s.mongodb.net/dpa";
mongoose.connect(uri).catch((err) => console.log(err.reason));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected");
});

db.on("error", (error) => {
  console.log("database is not connected", error);
});

export default mongoose;
