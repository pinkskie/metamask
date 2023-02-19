import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { store } from "./store";
import { Config, DAppProvider, Rinkeby } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DAppProvider config={config}>
          <App />
        </DAppProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
