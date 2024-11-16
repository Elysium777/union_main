"use client";

import { setDaos, setUnions } from "@/redux/slice/chainSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function useChain() {
  const dispatch = useDispatch();
  const chainId = useSelector((state) => state.chain.chainId);

  const loadDAOs = async () => {
    dispatch(setDaos([]));

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/dao/all/" + chainId
      );

      if (response.data.success) {
        dispatch(setDaos(response.data.DAOs));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadUnions = async () => {
    dispatch(setUnions([]));

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/union/all/" + chainId
      );

      if (response.data.success) {
        dispatch(setUnions(response.data.unions));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { loadDAOs, loadUnions };
}
