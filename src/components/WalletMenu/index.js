import { LoadingButton } from "@mui/lab";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { memo, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { splitAddress } from "../../utils";
import { TrustWallet } from "../../assets";
import { ListItemText, Menu, MenuItem, styled } from "@mui/material";
import { ExitToAppOutlined, PermIdentityOutlined } from "@mui/icons-material";

const WalletItem = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.caption,
  svg: {
    paddingRight: theme.spacing(1),
  },
}));

const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected } = useAccount();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("event:", event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const disconnectWallet = () => {
    disconnect();
    handleClose();
  };

  return (
    <div>
      {openConnectModal && (
        <LoadingButton
          variant="contained"
          shape="round"
          onClick={() => {
            openConnectModal();
          }}
        >
          Connect Wallet!
        </LoadingButton>
      )}

      {address && (
        <LoadingButton
          id="wallet-menu"
          shape="round"
          startIcon={<TrustWallet />}
          aria-controls={open ? "wallet-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {splitAddress(address)}
        </LoadingButton>
      )}
      <Menu
        id="wallet-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={(theme) => ({ marginTop: theme.spacing(1) })}
      >
        <WalletItem onClick={handleClose}>
          <PermIdentityOutlined fontSize="small" />
          <ListItemText>Profile</ListItemText>
        </WalletItem>
        <WalletItem onClick={disconnectWallet}>
          <ExitToAppOutlined fontSize="small" />
          <ListItemText>Disconnect</ListItemText>
        </WalletItem>
      </Menu>
    </div>
  );
};

export default memo(ConnectWallet);
