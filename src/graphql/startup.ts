import {
  asNexusMethod,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "../context";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { SECRET } from "../utils/auth";

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

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("startup", { type: "Startup" });
  },
});

export const StartupQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allStartups", {
      type: "Startup",
      resolve: (_root, _args, ctx: Context) => ctx.db.startup.findMany(),
    });
  },
});

export const StartupMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
        imageUrl: stringArg(),
        industry: nonNull(stringArg()),
        growthStage: stringArg(),
        fundingStage: stringArg(),
      },
      resolve: async (_root, args, ctx: Context) => {
        try {
          const hashedPassword = await hash(args.password, 10);

          const startup = await ctx.db.startup.create({
            data: {
              email: args.email.trim().toLocaleLowerCase(),
              password: hashedPassword,
              industry: args.industry,
              name: args.name.trim(),
              fundingStage: args.fundingStage,
              growthStage: args.growthStage,
              imageUr: args.imageUrl?.trim(),
            },
          });

          return {
            token: sign({ id: startup.id }, SECRET),
            startup,
          };
        } catch (e) {
          console.error(e);
          throw new Error("Error signing up");
        }
      },
    });
    t.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_root, { email, password }, ctx: Context) => {
        const startup = await ctx.db.startup.findUnique({
          where: { email },
        });

        if (!startup) throw new Error(`No user found for email: ${email}`);

        const passwordValid = await compare(password, startup.password);

        if (!passwordValid) throw new Error("Invalid password");

        return {
          token: sign({ id: startup.id }, SECRET),
          startup,
        };
      },
    });
  },
});
