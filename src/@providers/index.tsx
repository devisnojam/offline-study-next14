import { PropsWithChildren } from "react";
import ChakraProvider from "./chakra-provider";
import ModalProvider from "./modal-provider";

/**
 * @description 필요한 provider 정의
 */
export default function RootProviders({ children }: PropsWithChildren) {
  return (
    <ChakraProvider>
      <ModalProvider>{children}</ModalProvider>
    </ChakraProvider>
  );
}
