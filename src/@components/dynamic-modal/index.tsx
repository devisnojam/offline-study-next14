"use client";

import { Modal } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  closeCallback: () => void;
}

export default function DynamicModal({
  children,
  isOpen,
  closeCallback,
}: Props) {
  const handleClose = () => {
    closeCallback();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {children}
    </Modal>
  );
}
