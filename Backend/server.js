import express from "express";
import cors from "cors";
import "dotenv/config";

//app config
const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cors());

//initializing routes
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
