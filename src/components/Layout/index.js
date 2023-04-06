import { styled } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Suspense, memo } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={"loading"}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default memo(Layout);
