import { extendType, objectType } from "nexus";

type Post = {
  id: string;
  body: string;
  position: string;
  mailto: string;
  createdAt: string;
  imageUrl: string;
  location: string;
};

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.id("body");
    t.id("position");
    t.id("mailto");
    t.id("createdAt");
    t.id("imageUrl");
    t.id("location");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("allPosts", {
      type: "Post",
      resolve: (_root, _args, ctx) => ctx.db.post.findMany(),
    });
  },
});
