import User from "../../models/User";
import AppError from "../../errors/AppError";
import {
  createAccessToken,
  createRefreshToken
} from "../../helpers/CreateTokens";
import { SerializeUser } from "../../helpers/SerializeUser";
import Queue from "../../models/Queue";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  profile: string;
  queues: Queue[];
}

interface Request {
  email: string;
  password: string;
  tenantId?: number;
}

interface Response {
  serializedUser: SerializedUser;
  token: string;
  refreshToken: string;
}

const AuthUserService = async ({
  email,
  password,
  tenantId
}: Request): Promise<Response> => {
  // Buscar usuario por email y tenantId si se provee
  const where: any = { email };
  if (tenantId) {
    where.tenantId = tenantId;
  }
  const user = await User.findOne({
    where,
    include: [
      { model: Queue, as: "queues" },
      {
        model: require("../../models/Tenant").default,
        as: "tenant",
        attributes: ["id", "displayName"]
      }
    ]
  });

  if (!user) {
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }

  if (!(await user.checkPassword(password))) {
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }

  const token = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  const serializedUser = SerializeUser(user);

  return {
    serializedUser,
    token,
    refreshToken
  };
};

export default AuthUserService;
