import { useEffect } from "react";
import markup from "./markup.html?raw";
import { initStudy } from "./init.js";

export function StudyApp() {
  useEffect(() => initStudy(), []);
  return (
    <div
      className="study-root"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
