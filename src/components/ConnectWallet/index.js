import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { memo } from "react";
import { useAccount } from "wagmi";

const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnecting, isDisconnected } = useAccount();

  console.log("useAccount:", address, isConnecting, isDisconnected);

  return (
    <div>
      <ConnectButton />

      {openConnectModal && (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      )}

      {openChainModal && (
        <button onClick={openChainModal} type="button">
          Open Chain Modal
        </button>
      )}
    </div>
  );
};

export default memo(ConnectWallet);
