import { Router } from "express";
import * as TenantController from "../controllers/TenantController";

const tenantRoutes = Router();

tenantRoutes.post("/tenants", TenantController.createTenant);

// Buscar tenant por nombre
tenantRoutes.get("/tenants/by-name/:name", TenantController.getTenantByName);

export default tenantRoutes;
