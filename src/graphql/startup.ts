import { asNexusMethod, extendType, objectType } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "../context";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const Startup = objectType({
  name: "Startup",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("email");
    t.nonNull.string("name");
    t.string("imageUrl");
    t.string("industry");
    t.string("growthStage");
    t.string("fundingStage");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.list.nonNull.field("posts", {
      type: "Post",
      resolve: (parent, _, ctx: Context) => {
        return ctx.db.startup
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts();
      },
    });
  },
});

export const StartupQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("allStartups", {
      type: "Startup",
      resolve: (_root, _args, ctx: Context) => ctx.db.startup.findMany(),
    });
  },
});
