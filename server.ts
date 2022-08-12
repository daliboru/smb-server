import { ApolloServer } from "apollo-server";
import { schema } from "./src/schema";
import { context } from "./src/context";

export const server = new ApolloServer({ schema, context });
