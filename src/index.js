import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../src/app/store";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import Explore from "./components/Explore";
import Bookmarks from "./components/Bookmarks";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-toastify/dist/ReactToastify.css";

import Suggestions from "./components/Suggestions";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/suggestion",
    element: <Suggestions />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
