import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Suspense, memo } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  height: 80px;
  background-color: aquamarine;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  p {
    font-size: 40px;
  }
  div {
    display: flex;
    justify-center: center;
    gap: 5px;
  }
`;

const Layout = () => {
  return (
    <div>
      <Header>
        <p>Layout</p>
        <div>
          <Link to="/">Home</Link>
          <Link to="/children">Go to children</Link>
          <Link to="/children/1">Go to children-1</Link>
          <Link to="/other">Others</Link>
        </div>
        <ConnectButton />
      </Header>
      <Suspense fallback={"loading"}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default memo(Layout);
