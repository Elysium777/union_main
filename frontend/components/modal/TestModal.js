"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../ui/Modal";
import { toggleTestModal } from "@/redux/slice/modalSlice";

const TestModal = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.modal.testModal);

  const closeModal = () => {
    dispatch(toggleTestModal());
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Modal Title">
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This is the modal content. Customize this content as you need.
      </p>
    </Modal>
  );
};

export default TestModal;
