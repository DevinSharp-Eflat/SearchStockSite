import * as React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp.tsx";
import Login from "./components/Login.tsx";
import HomePage from "./homePage.tsx";
import DetailsPage from "./detailsPage.tsx";
import AccountDetails from './components/AccountDetails.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "details/:stockTicker",
        element: <DetailsPage />,
      },
      {
        path: "account",
        element: <AccountDetails/>
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
