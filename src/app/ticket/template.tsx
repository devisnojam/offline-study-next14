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

export default function ModalTemplate({ children }: PropsWithChildren) {
  console.log("ModalTemplate");

  const router = useRouter();

  const handleClose = () => {
    // router.refresh();
    router.back();
  };

  return (
    <Modal isOpen isCentered onClose={handleClose}>
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
