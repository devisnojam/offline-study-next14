"use client";

import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";

interface Props {
  open: boolean;
  title?: string;
}

export default function StatelessModal({
  children,
  title,
}: PropsWithChildren<Props>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    console.log("handleClose");
    setIsOpen(false);
  };

  const handleCloseComplete = () => {
    console.log("handleCloseComplete");
    router.refresh();
  };

  // children을 새로운 props와 함께 복제하여 렌더링
  const clonedChildren = React.Children.map(children, (child) => {
    // 컴포넌트가 유효한 React 엘리먼트인지 확인
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onCloseModal: handleClose,
      });
    }
    return child;
  });

  return (
    <Modal
      isOpen={isOpen}
      isCentered
      onClose={handleClose}
      onCloseComplete={handleCloseComplete}
    >
      <ModalOverlay />
      <ModalContent>
        {title && (
          <ModalHeader>
            <Heading size="md">{title}</Heading>
          </ModalHeader>
        )}

        <ModalBody>{clonedChildren}</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
