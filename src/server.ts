import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
dotenv.config({
  path: path.join(__dirname, `/config/.env.${process.env.NODE_ENV}`),
});
import express from "express";
import bodyParser from "body-parser";
import { AuthRouter } from "./controllers/authController";
import { errorHandler } from "./utils/errorHandler";
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(errorHandler);

// Routes
app.use("/auth", AuthRouter);
// Create https server.
const sslDir = path.join(__dirname, "../ssl");
const key = path.join(sslDir, "server.key");
const cert = path.join(sslDir, "server.cert");
https
  .createServer(
    {
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
