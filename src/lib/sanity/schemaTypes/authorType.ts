import { UserCheck2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserCheck2,
  description: "Author details",
  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});