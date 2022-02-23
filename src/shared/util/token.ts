import config from "config";
import {
  JwtPayload,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from "jsonwebtoken";

import { Auth } from "@config/types";

const auth = config.get<Auth>("App.auth");

export async function generateJwt(
  payload: string | object | Buffer,
  options?: SignOptions | undefined
): Promise<string> {
  const token = sign(payload, auth.secret, options);

  return token;
}

export async function verifyJwt(
  token: string,
  options?:
    | (VerifyOptions & {
        complete?: false | undefined;
      })
    | undefined
): Promise<string | JwtPayload> {
  const verification = verify(token, auth.secret, options);

  return verification;
}
