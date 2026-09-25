"use client";
import { Refractor, registerLanguage } from "react-refractor";
import js from "refractor/javascript";
import ts from "refractor/typescript";
import python from "refractor/python";
import cpp from "refractor/cpp";
import go from "refractor/go";
import gomod from "refractor/go-module";
import bash from "refractor/bash";
import sql from "refractor/sql";
import tsx from "refractor/tsx";
import jsx from "refractor/jsx";
import markdown from "refractor/markdown";
import html from "refractor/markup";
import css from "refractor/css";
import yaml from "refractor/yaml";
import graphql from "refractor/graphql";
import json from "refractor/json";
import ino from "refractor/arduino";

registerLanguage(js);
registerLanguage(ts);
registerLanguage(python);
registerLanguage(cpp);
registerLanguage(go);
registerLanguage(gomod);
registerLanguage(bash);
registerLanguage(sql);
registerLanguage(tsx);
registerLanguage(jsx);
registerLanguage(markdown);
registerLanguage(html);
registerLanguage(css);
registerLanguage(yaml);
registerLanguage(graphql);
registerLanguage(json);
registerLanguage(ino);

import 'prism-themes/themes/prism-lucario.css';

type codeTypes = {
  value: {
    code: string;
    language: string;
    filename?: string | null;
  };
};

export function CodeBlock({ value }: codeTypes) {
  return (
    <div className="min-w-0 not-sm:max-w-[80vw] not-sm:mx-auto">
      <div className="flex items-center justify-between bg-mist-200 border border-mist-500 rounded-t-lg px-4 py-1 translate-y-3">
        <p className="text-sm font-medium">
          {value.filename ?? "Code snippet"}
        </p>
      </div>
      <Refractor
        language={value.language ?? "tsx"}
        value={value.code}
        className="block max-w-full overflow-x-auto border-x border-b border-mist-500 rounded-b-lg px-4 py-1 text-sm tracking-normal"
      />
    </div>
  );
}
