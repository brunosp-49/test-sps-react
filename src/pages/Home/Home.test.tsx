import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../../store";
import Home from "./Home";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderHome() {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

describe("Home", () => {
  it("renders dashboard title and subtitle", () => {
    renderHome();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Visão geral do sistema")).toBeInTheDocument();
  });
});
