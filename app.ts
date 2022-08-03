require("dotenv").config();
import { server } from "./server";

const port = process.env.PORT || 5000;

server.listen({ port }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
