import {
  arg,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { Context } from "../context";
import { getStartupId } from "../utils/auth";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("body");
    t.nonNull.string("title");
    t.nonNull.string("mailto");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("location");
    t.nonNull.boolean("published");
    t.field("startup", {
      type: "Startup",
      resolve: (parent, _, ctx: Context) => {
        return ctx.db.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .startup();
      },
    });
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("allPosts", {
      type: "Post",
      resolve: (_, _args, ctx) => ctx.db.post.findMany(),
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        data: nonNull(
          arg({
            type: "PostCreateInput",
          })
        ),
      },
      resolve: async (_, args, ctx: Context) => {
        const startupId = getStartupId(ctx);
        if (startupId) {
          return ctx.db.post.create({
            data: {
              title: args.data.title.trim(),
              body: args.data.body,
              mailto: args.data.mailto.trim(),
              location: args.data.location.trim(),
              published: args.data.published,
              startupId: startupId,
            },
          });
        }
        throw new Error("Error creating a post");
      },
    });
    t.field("updatePost", {
      type: "Post",
      args: {
        data: nonNull(
          arg({
            type: "PostUpdateInput",
          })
        ),
      },
      resolve: async (_, args, ctx: Context) => {
        try {
          return await ctx.db.post.update({
            where: { id: args.data.id },
            data: {
              title: args.data.title.trim(),
              body: args.data.body,
              mailto: args.data.mailto.trim(),
              location: args.data.location.trim(),
              published: args.data.published,
            },
          });
        } catch (e) {
          throw new Error(`Error on post update with id: ${args.data.id}`);
        }
      },
    });
    t.field("removePost", {
      type: "Post",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, { id }, ctx: Context) => {
        return ctx.db.post.delete({
          where: { id },
        });
      },
    });
  },
});

export const PostCreateInput = inputObjectType({
  name: "PostCreateInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nonNull.string("mailto");
    t.nonNull.string("location");
    t.nonNull.boolean("published");
  },
});

export const PostUpdateInput = inputObjectType({
  name: "PostUpdateInput",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nonNull.string("mailto");
    t.nonNull.string("location");
    t.nonNull.boolean("published");
  },
});
