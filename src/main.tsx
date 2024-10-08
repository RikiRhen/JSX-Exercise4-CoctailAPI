import ReactDOM from "react-dom/client";

import "./css/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>

);
