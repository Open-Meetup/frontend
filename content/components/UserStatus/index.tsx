import { useActor } from "@xstate/react";
import classNames from "classnames/bind";
import React, { useContext, useState } from "react";
import { WalletStateContext } from "~/content/machines/wallet/provider";
import type { WalletName } from "services/wallet";
import Address from "../Address";
import UnknownUserImage from "../Svgs/unknownUser";
import style from "./index.module.scss";

const cx = classNames.bind(style);

type UserStatus = "unknown";

const UserStatus = () => {
  const walletContext = useContext(WalletStateContext);
  const [walletState, walletSend] = useActor(walletContext.walletService);
  const [isWalletListVisible, setIsWalletListVisible] = useState(false);

  const isWalletConnected = walletState.matches("connected");

  const handleConnectWallet = async (walletName) => {
    await walletSend({
      type: "WALLET_SELECTED",
      data: walletName,
    });
    setIsWalletListVisible(false);
  };
  const handleDisconnectWallet = async () => {
    await walletSend({
      type: "DISCONNECT",
    });
  };

  return (
    <>
      <div className={cx("user-status")}>
        {isWalletConnected ? (
          <div className={cx("user-status__wallet-connected")}>
            <UnknownUserImage type="onlyAddress" />
            <div className={cx("user-status__info")}>
              <strong>{walletState.context.walletName}@Polygon</strong>
              <span className={cx("user-status__info-address")}>
                <Address address={walletState.context.walletAddress} />
              </span>
              <div className={cx("user-status__info-actions")}>
                <button
                  className={cx("user-status__info-profile")}
                  onClick={() => alert("show profile!")}
                  type="button"
                >
                  edit profile
                </button>
                <button
                  className={cx("user-status__info-disconnect")}
                  onClick={handleDisconnectWallet}
                  type="button"
                >
                  disconnect
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={cx("user-status__unknown")}>
              <UnknownUserImage type="guest" />
              unknown
            </div>
            <button
              className={cx("user-status__connect-wallet")}
              onClick={() => setIsWalletListVisible(true)}
              type="button"
            >
              Login with wallet
            </button>
          </>
        )}
      </div>
      {isWalletListVisible ? (
        <div className={cx("user-status__wallets")}>
          <div className={cx("user-status__wallets-head")}>
            <h5 className={cx("user-status__wallets-title")}>
              Choose wallet type
            </h5>
            <button
              className={cx("user-status__wallets-close")}
              onClick={() => setIsWalletListVisible(false)}
              type="button"
            >
              Close
            </button>
          </div>
          <div className={cx("user-status__wallets-content")}>
            <button
              className={cx("user-status__wallets-btn")}
              onClick={() => handleConnectWallet("metamask")}
              type="button"
            >
              Browser wallet
            </button>
            <button
              className={cx("user-status__wallets-btn")}
              onClick={() => handleConnectWallet("walletConnect")}
              type="button"
            >
              Other wallets
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserStatus;
