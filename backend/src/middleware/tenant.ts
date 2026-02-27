import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import Tenant from "../models/Tenant";
import { setCurrentTenant } from "../models/hooks/setupTenantScopes";

/**
 * Extrae tenantId del JWT token o del header
 * Opciones de identificación:
 * 1. Del token JWT
 * 2. Del header X-Tenant-ID
 * 3. Del dominio (ej: xyz.whaticket.com)
 */
export const setTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let tenantId: number | null = null;

    // Opción 1: Del JWT (si agregaste tenantId al token)
    if (req.user?.tenantId) {
      tenantId = req.user.tenantId;
    } else if (req.headers && req.headers.authorization) {
      // Extraer tenantId del token JWT si no está en req.user
      try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = require("jsonwebtoken").decode(token);
        if (decoded && typeof decoded === "object" && "tenantId" in decoded) {
          tenantId = decoded.tenantId;
        }
      } catch (err) {
        // ignorar error, se manejará más adelante
      }
    }

    // Opción 2: Del header custom (aceptar minúsculas y mayúsculas)
    let headerTenant = req.headers["x-tenant-id"];
    if (!headerTenant && req.headers["X-Tenant-Id"]) {
      headerTenant = req.headers["X-Tenant-Id"];
    }
    if (headerTenant && !tenantId) {
      tenantId = parseInt(headerTenant as string);
    }

    // Opción 3: Del dominio (subdomain)
    if (!tenantId) {
      const host = req.headers.host;
      const subdomain = host?.split(".")[0];

      if (subdomain && subdomain !== "localhost") {
        const tenant = await Tenant.findOne({
          where: { name: subdomain }
        });
        if (tenant) {
          tenantId = tenant.id;
        }
      }
    }

    if (!tenantId) {
      throw new AppError("Tenant not identified", 400);
    }

    // Validar que el tenant existe y está activo
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant || tenant.status !== "active") {
      throw new AppError("Tenant not found or inactive", 403);
    }

    // Guardar en request
    req.tenantId = tenantId;
    if (req.user) {
      req.user.tenantId = tenantId;
    }

    setCurrentTenant(tenantId); // ← Aplicar scope globalmente
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Valida que el usuario pertenece al tenant
 */
export const validateUserTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.id || !req.tenantId) {
      throw new AppError("User or tenant not identified", 401);
    }

    const User = require("../models/User").default;
    const user = await User.findByPk(req.user.id);

    if (!user || user.tenantId !== req.tenantId) {
      throw new AppError("Unauthorized access", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
