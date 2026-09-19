import { useEffect } from "react";
import markup from "./markup.html?raw";
import { initPractice } from "./init.js";

export function PracticeApp() {
  useEffect(() => initPractice(), []);
  return (
    <div
      className="study-root"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
