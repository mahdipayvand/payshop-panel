import "vazirmatn/Vazirmatn-font-face.css";
import "styles/index.css";

import { App } from "containers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
