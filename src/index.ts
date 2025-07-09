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
// import { initializeDatabase } from "./db/init.js";

const PORT = Number(process.env.PORT ?? "9001");
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT.toString()}`);
});

// async function startServer() {
//   try {
//     console.log("Initializing database...");
//     await initializeDatabase();
//     console.log("Database initialized successfully");

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server listening on port ${PORT.toString()}`);
//     });
//   } catch (error) {
//     console.error("Database initialization failed:", error);
//     // Still start the server even if DB init fails
//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(
//         `Server listening on port ${PORT.toString()} (DB init failed)`,
//       );
//     });
//   }
// }

// await startServer();
