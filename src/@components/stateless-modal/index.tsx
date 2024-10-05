"use client";

import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function StatelessModal({ children }: Props) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} isCentered onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
