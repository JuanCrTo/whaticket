import "./bootstrap";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";

import "./database";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import routes from "./routes";
import { logger } from "./utils/logger";
import { setTenant, validateUserTenant } from "./middleware/tenant";
import isAuth from "./middleware/isAuth";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);
app.use(cookieParser());
app.use(express.json());

// Middleware para rutas privadas (requieren tenant)
app.use((req, res, next) => {
  // Permitir crear tenant y otras rutas públicas sin tenantId
  if (
    (req.method === "POST" && req.path === "/tenants") ||
    (req.method === "POST" && req.path === "/auth/signup") ||
    (req.method === "POST" && req.path === "/auth/login") ||
    (req.method === "POST" && req.path === "/auth/refresh_token") ||
    (req.method === "GET" && req.path.startsWith("/tenants/by-name/"))
    // Puedes agregar aquí más rutas públicas si lo necesitas
  ) {
    return next();
  }
  setTenant(req, res, err => {
    if (err) return next(err);
    isAuth(req, res, err2 => {
      if (err2) return next(err2);
      validateUserTenant(req, res, next);
    });
  });
});

app.use("/public", express.static(uploadConfig.directory));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
