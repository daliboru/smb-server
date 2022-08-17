import { verify } from "jsonwebtoken";
import { Context } from "../context";

export const SECRET = process.env.SECRET as string;

interface Token {
  startupId: string;
}

export function getStartupId(ctx: Context) {
  const authHeader = ctx.req.get("Authorization");
  if (authHeader) {
    inspectToken(authHeader);
  }

  function inspectToken(authHeader: string) {
    try {
      const token = authHeader.replace("Bearer ", "");
      const verifiedToken = verify(token, SECRET) as Token;
      return verifiedToken && Number(verifiedToken.startupId);
    } catch (e) {
      throw new Error("Session invalid");
    }
  }
}
