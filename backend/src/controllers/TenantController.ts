// Buscar tenant por nombre
export const getTenantByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { name } = req.params;
  name = name.trim().toLowerCase();
  const tenant = await Tenant.findOne({ where: { name } });
  if (!tenant) {
    throw new AppError("Tenant not found", 404);
  }
  return res.json({
    id: tenant.id,
    name: tenant.name,
    displayName: tenant.displayName
  });
};
import { Request, Response } from "express";
import Tenant from "../models/Tenant";
import AppError from "../errors/AppError";

export const createTenant = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { name, displayName, plan, logo, domain } = req.body;

  if (!name || !displayName) {
    throw new AppError("Name and displayName are required", 400);
  }

  // Normalizar nombre a minúsculas y sin espacios
  name = name.trim().toLowerCase();

  // Validar que no exista
  const exists = await Tenant.findOne({ where: { name } });
  if (exists) {
    throw new AppError("Tenant name already exists", 409);
  }

  const tenant = await Tenant.create({
    name,
    displayName,
    plan: plan || "free",
    logo: logo || null,
    domain: domain || null,
    status: "active"
  });

  return res.status(201).json(tenant);
};
