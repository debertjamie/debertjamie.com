"use client";
import { useEffect } from "react";

export function Message() {
  useEffect(() => {
    console.log(
      `\
%cHello there!

This site is open source! Don't forget to check this repo:

https://github.com/debertjamie/debertjamie.dev

and give it a star ⭐

Happy digging!
`,
      "font-size: 12px",
    );
  }, []);

  return null;
}
