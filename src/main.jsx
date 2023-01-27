import "react-toastify/dist/ReactToastify.css";
import "vazirmatn/Vazirmatn-font-face.css";
import "styles/index.css";

import { App } from "containers";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
