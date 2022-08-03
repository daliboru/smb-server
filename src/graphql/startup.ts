import { extendType, objectType, stringArg } from "nexus";

type Startup = {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  industry: string;
  growthStage?: string;
  fundingStage?: string;
  createdAt: string;
};

export const Startup = objectType({
  name: "Startup",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("name");
    t.string("imageUrl");
    t.string("industry");
    t.string("location");
    t.string("growthStage");
    t.string("fundingStage");
    t.string("createdAt");
  },
});

export const StartupQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("findStartupById", {
      type: "Startup",
      args: { id: stringArg() },
      resolve: (_root, args, ctx) => {
        const id = args.id as string;
        return ctx.db.startup.findFirst({ where: { id } });
      },
    });
  },
});
