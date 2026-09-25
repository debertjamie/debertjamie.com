import { ClockFading } from "lucide-react";
import { defineType, defineField } from "sanity";

export const nowType = defineType({
  name: "now",
  title: "Now",
  type: "document",
  icon: ClockFading,
  description: "Currently doing or working on",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
  ]
});