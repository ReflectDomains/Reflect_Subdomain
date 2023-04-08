import { Stack } from "@mui/material";
import { memo } from "react";
import { LogoIcon } from "../../assets/index";
import WalletMenu from "../WalletMenu";

const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        height: "70px",
        padding: theme.spacing(0, 4),
      })}
    >
      <LogoIcon />
      <WalletMenu />
    </Stack>
  );
};

export default memo(Header);
