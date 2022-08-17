import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export interface Context {
  db: PrismaClient;
  req: any; // HTTP request carrying the `Authorization` header
}

export function createContext(req: any) {
  return {
    ...req,
    db,
  };
}
