import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authorization-context";
import { MessageHandlingProvider } from "./context/message-handling-context";
import { DBdataProvider } from "./context/db-data-context";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MessageHandlingProvider>
        <AuthProvider>
          <DBdataProvider>
            <App />
          </DBdataProvider>
        </AuthProvider>
      </MessageHandlingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
