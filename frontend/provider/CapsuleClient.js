"use client";

import "@usecapsule/react-sdk/styles.css";

import React from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";

const CapsuleModal = dynamic(
  () => import("@usecapsule/react-sdk").then((mod) => mod.CapsuleModal),
  {
    ssr: false,
  }
);

import { toggleCapsuleModal } from "@/redux/slice/modalSlice";
import useCapsule from "@/hooks/useCapsule";
import { setIsLoggedIn } from "@/redux/slice/capsuleSlice";
import { useAccount } from "wagmi";

function CapsuleClient() {
  const dispatch = useDispatch();
  const { capsule } = useCapsule();
  const { address } = useAccount();
  const isOpen = useSelector((state) => state.modal.CapsuleModal);

  const { isLoggedIn } = useCapsule();

  const checkLoggedIn = async () => {
    const loggedIn = await isLoggedIn();
    dispatch(setIsLoggedIn(loggedIn));
  };

  React.useEffect(() => {
    checkLoggedIn();
  }, [isOpen, address]);

  return (
    <CapsuleModal
      capsule={capsule}
      isOpen={isOpen}
      onClose={() => {
        dispatch(toggleCapsuleModal(false));
      }}
      logo={""}
      theme={{
        backgroundColor: "#242424",
        accentColor: "#fff",
        foregroundColor: "#fff",
        font: "Arial, sans-serif",
        mode: "dark",
        borderRadius: "md",
      }}
      // oAuthMethods={["GOOGLE", "FARCASTER"]}
      disableEmailLogin={false}
      disablePhoneLogin={true}
      authLayout={["EXTERNAL:FULL"]}
      externalWallets={["METAMASK", "COINBASE", "WALLETCONNECT"]}
      twoFactorAuthEnabled={false}
      recoverySecretStepEnabled={false}
      onRampTestMode
    />
  );
}

export default CapsuleClient;
