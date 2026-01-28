declare namespace Express {
  interface Request {
    user?: {
      id: string;
      profile: string;
      tenantId: number; // ← AGREGAR ESTO
    };
    tenantId?: number; // ← O COMO PROPIEDAD SEPARADA
  }
}
