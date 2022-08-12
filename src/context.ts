import { PrismaClient } from "@prisma/client";

export interface Context {
  db: PrismaClient;
}

const db = new PrismaClient();

export const context: Context = {
  db,
};
