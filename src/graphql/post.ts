import { arg, extendType, inputObjectType, nonNull, objectType } from "nexus";
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
      resolve: (_root, _args, ctx) => ctx.db.post.findMany(),
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
      resolve: async (_root, args, ctx: Context) => {
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
