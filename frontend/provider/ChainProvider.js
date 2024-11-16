"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useChain from "@/hooks/useChain";
import { setChainId } from "@/redux/slice/chainSlice";
import { useState } from "react";
import config from "@/lib/config";

export default function ChainProvider({ children }) {
  const chainId = useSelector((state) => state.chain.chainId);
  const { loadDAOs, loadUnions } = useChain();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chainId")) {
      const chainId = localStorage.getItem("chainId");

      dispatch(setChainId(Number(chainId)));

      setCheck(true);
    } else {
      dispatch(setChainId(config.chains[0].chainId));

      setCheck(true);
    }
  }, []);

  useEffect(() => {
    if (check) {
      loadDAOs();
      loadUnions();
    }
  }, [chainId, check]);

  if (!check) return;

  return children;
}
