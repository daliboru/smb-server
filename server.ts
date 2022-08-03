import { ApolloServer } from "apollo-server";
import { schema } from "./src/schema";

export const server = new ApolloServer({ schema });
