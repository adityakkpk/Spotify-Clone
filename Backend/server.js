import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import ConnectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

//app config
const app = express();
const PORT = process.env.PORT || 8000;
ConnectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//initializing routes
app.use("/api/song", songRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
