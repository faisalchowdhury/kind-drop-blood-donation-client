import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./routers/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import NotyfProvider from "./notyf/NotyfProvider.jsx";

const route = Router();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NotyfProvider>
          <RouterProvider router={route}></RouterProvider>
        </NotyfProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
