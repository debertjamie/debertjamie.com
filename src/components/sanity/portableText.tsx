"use client";

import { PortableText } from "@portabletext/react";
import type { ComponentProps } from "react";
import { CustomPortableTextComponents } from "./customise";

type PortableTextValue = ComponentProps<typeof PortableText>["value"];

export function PortableTextRenderer({ value }: { value: PortableTextValue }) {
  return (
    <PortableText
      value={value}
      components={CustomPortableTextComponents}
    />
  );
}