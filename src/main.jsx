import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./componets/Signup.jsx";
import DashboardLayout from "./componets/DashBoardLayout.jsx";
import AddPage from "./AddPage.jsx";
import FilterComponent from "./componets/FilterComponent.jsx";
import Charts from "./componets/Charts.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.jsx";
import Login from "./componets/login.jsx"; // ✅ MATCHES FILE
import Home from "./componets/Home.jsx";
import Recents from "./componets/Recents.jsx";
import "./index.css";
import Form from "./componets/Form.jsx";
import LoginModalWrapper from "./LoginModalWrapper.jsx";

const router = createBrowserRouter([
  
    {
    path: "/",
    element: <Home />,
  },

  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
     
      < ProtectedRoute>
          <DashboardLayout />
          </ProtectedRoute>
        
      
    ),
    children: [
      {
        path: "",
        element: <Recents />
      },
      {
        path: "add",
        element: <AddPage />,
      },
      {
        path: "filter",
        element: <FilterComponent />,
      },
      {
        path: "charts",
        element: <Charts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpenseProvider>
      <RouterProvider router={router} />
    </ExpenseProvider>
    
  </React.StrictMode>
);
