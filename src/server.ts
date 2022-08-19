require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { schema } from "./schema";

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  schema,
  context: createContext,
  cache: "bounded",
  csrfPrevention: true,
});

server.listen({ port }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
