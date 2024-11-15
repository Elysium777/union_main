"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../ui/Modal";
import { toggleContractsModal } from "@/redux/slice/modalSlice";

const ContractsAndPModal = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.modal.contractsModal);

  const closeModal = () => {
    dispatch(toggleContractsModal());
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Modal Title">
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This is the modal content. Customize this content as you need.
      </p>
    </Modal>
  );
};

export default ContractsAndPModal;
