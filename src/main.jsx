import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Routers/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./Layouts/MainLayout.jsx";

const route = Router();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
        <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}>

  </RouterProvider>
        </QueryClientProvider>
    </StrictMode>
);
