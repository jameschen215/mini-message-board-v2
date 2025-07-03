import express, { NextFunction, Response, Request } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import url from "url";

import { router as indexRoutes } from "@/routes/indexRoutes.js";
import { CustomNotFoundError } from "@/errors/CustomNotFoundError.js";

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

// global error
interface CustomError extends Error {
  statusCode?: number;
  status?: number;
}

app.use(
  (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);

    const statusCode = err.statusCode ?? err.status ?? 500;
    const message = err.message ? err.message : "Internal Server Error";
    const title = statusCode === 500 ? "Server Error" : "Error";

    res.status(statusCode).render("error", {
      title,
      message,
      statusCode,
    });
  },
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
