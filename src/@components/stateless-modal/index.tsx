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

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
}

export default function StatelessModal({ children, title }: Props) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} isCentered onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        {title && (
          <ModalHeader>
            <Heading size="md">{title}</Heading>
          </ModalHeader>
        )}

        <ModalBody>{children}</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
