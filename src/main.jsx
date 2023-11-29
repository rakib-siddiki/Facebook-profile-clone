import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// eslint-disable-next-line no-unused-vars
import app from "../firebaseConfig";
import SingUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import ForgotPassword from "./pages/forgetPassword/ForgetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SingUp />,
  },{
    path:'/sign-in',
    element:<SignIn/>
  },
  {
    path:'/forget-password',
    element:<ForgotPassword/>
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
