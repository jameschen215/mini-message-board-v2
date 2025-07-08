import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import url from "url";

import { router as indexRoutes } from "./routes/indexRoutes.js";
import { CustomNotFoundError } from "./errors/CustomNotFoundError.js";
import { errorHandler } from "./controllers/errorController.js";

const PORT = process.env.PORT ?? "9001";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set view engine and its location
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(helmet());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes);

// 404 handler
app.use((_req, _res) => {
  throw new CustomNotFoundError("Page Not Found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
