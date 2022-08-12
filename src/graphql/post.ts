import { extendType, objectType } from "nexus";
import { Context } from "../context";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("body");
    t.nonNull.string("title");
    t.nonNull.string("mailto");
    t.string("imageUrl");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.string("location");
    t.nonNull.boolean("published");
    t.nonNull.int("viewCount");
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
