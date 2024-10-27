import { ContextProvider } from "./contexts/UserContext.tsx";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import router from "./router.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ContextProvider>
  </StrictMode>
);
