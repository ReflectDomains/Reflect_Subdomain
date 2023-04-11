import { Container } from "@mui/material";
import { Suspense, memo } from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={"loading"}>
        <Container
          maxWidth="md"
          disableGutters={true}
          sx={{ padding: "0", margin: "0 auto" }}
        >
          <Outlet />
        </Container>
      </Suspense>
    </div>
  );
};

export default memo(Layout);
