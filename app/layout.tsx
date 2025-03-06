"use client";

import "./globals.css";
import React, { ReactNode } from "react";
import ClientWrapper from "./layout/ClientWrapper";
import { Provider } from "react-redux";
import store from "./Redux";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ClientWrapper>{children}</ClientWrapper>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
