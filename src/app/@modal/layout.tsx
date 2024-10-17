"use client";

import { useModalProvider } from "@/@providers/modal-provider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export default function ModalLayout({ children }: PropsWithChildren) {
  const { onCloseModal } = useModalProvider();

  return (
    <Modal isOpen isCentered closeOnOverlayClick={false} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        {/* {title && (
          <ModalHeader>
            <Heading size="md">{title}</Heading>
          </ModalHeader>
        )} */}

        <ModalBody>{children}</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
