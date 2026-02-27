// ...existing code...
import { Request, Response } from "express";
import AppError from "../errors/AppError";

import AuthUserService from "../services/UserServices/AuthUserService";
import { SendRefreshToken } from "../helpers/SendRefreshToken";
import { RefreshTokenService } from "../services/AuthServices/RefreshTokenService";

export const store = async (req: Request, res: Response): Promise<Response> => {
  console.log("LOGIN REQUEST RECIBIDO");
  console.log("LOGIN DEBUG", {
    headers: req.headers,
    body: req.body
  });
  const { email, password } = req.body;
  // Extraer tenantId del header
  let tenantId: number | undefined;
  const tenantHeader = req.headers["x-tenant-id"];
  if (tenantHeader) {
    tenantId = parseInt(tenantHeader as string);
  }

  const { token, serializedUser, refreshToken } = await AuthUserService({
    email,
    password,
    tenantId
  });

  SendRefreshToken(res, refreshToken);

  return res.status(200).json({
    token,
    user: serializedUser
  });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string = req.cookies.jrt;

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  const { user, newToken, refreshToken } = await RefreshTokenService(
    res,
    token
  );

  SendRefreshToken(res, refreshToken);

  return res.json({ token: newToken, user });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.clearCookie("jrt");

  return res.send();
};
