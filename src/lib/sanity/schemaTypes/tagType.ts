import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: Tag,
  description: "Blog post tags",
  fields: [
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "tag",
      },
    }),
  ],
});