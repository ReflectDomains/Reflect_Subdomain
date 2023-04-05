import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "./config/client";

import "./index.less";
import "@rainbow-me/rainbowkit/styles.css";
import AuthRouter from "./provider/AuthRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AuthRouter>
          <App />
        </AuthRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </BrowserRouter>
);
