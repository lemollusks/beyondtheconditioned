import { useLayoutEffect } from "react";
import markup from "./markup.html?raw";
import { initEightfold } from "./init.js";

export function EightfoldApp() {
  useLayoutEffect(() => initEightfold(), []);
  return <div className="study-root" dangerouslySetInnerHTML={{ __html: markup }} />;
}
