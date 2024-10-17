"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";
import ModalProvider from "../../@providers/modal-provider";

export default function ModalLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        {/* {title && (
          <ModalHeader>
            <Heading size="md">{title}</Heading>
          </ModalHeader>
        )} */}

        <ModalBody>
          <ModalProvider>{children}</ModalProvider>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
