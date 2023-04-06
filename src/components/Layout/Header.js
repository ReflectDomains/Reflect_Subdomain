import { Box, Stack } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/index";
import WalletMenu from "../WalletMenu";

const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        height: "104px",
        padding: theme.spacing(0, 4),
      })}
    >
      <Logo />
      {/* <ConnectButton showBalance={false} /> */}
      <WalletMenu />
    </Stack>
  );
};

export default memo(Header);
