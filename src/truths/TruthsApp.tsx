import { useLayoutEffect } from "react";
import markup from "./markup.html?raw";
import { initTruths } from "./init.js";

export function TruthsApp() {
  useLayoutEffect(() => initTruths(), []);
  return <div className="study-root" dangerouslySetInnerHTML={{ __html: markup }} />;
}
