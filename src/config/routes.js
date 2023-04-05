import { lazy } from "react";

import Layout from "../components/Layout";
// const Layout = lazy(() => import("../components/Layout"));
const Home = lazy(() => import("../pages/Home"));
const OthersPages = lazy(() => import("../pages/OthersPages"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Children = lazy(() => import("../pages/Home/Children"));

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
