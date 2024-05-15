import express from "express";
import bodyParser from "body-parser";
import { AuthRouter } from "./controllers/authController";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", AuthRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
