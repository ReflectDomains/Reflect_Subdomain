import { lazy } from "react";

import Layout from "../components/Layout";
// const Layout = lazy(() => import("../components/Layout"));
const Home = lazy(() => import("../pages/Home"));
const OthersPages = lazy(() => import("../pages/OthersPages"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Children = lazy(() => import("../pages/Home/Children"));
const Profile = lazy(() => import("../pages/Profile"));
const Setting = lazy(() => import("../pages/Setting"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        needConnected: false,
      },

      {
        path: "children/:id",
        element: <Children />,
        needConnected: true,
      },
      {
        path: "profile",
        element: <Profile />,
        needConnected: true,
      },
      {
        path: "setting",
        element: <Setting />,
        needConnected: true,
      },
      {
        path: "other",
        element: <OthersPages />,
        needConnected: false,
      },
      // { path: "error", element: <ErrorPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

export default routes;
