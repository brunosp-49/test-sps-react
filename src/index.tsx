import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import { ThemeProvider } from "./theme/ThemeContext";
import "./i18n/config";
import "./styles/global.css";
import AppRoutes from "./routes/routes";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ThemeProvider>
            <AppRoutes />
            <Toaster />
          </ThemeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
