import { PropsWithChildren } from "react";
import ChakraProvider from "./chakra-provider";

/**
 * @description 필요한 provider 정의
 */
export default function RootProviders({ children }: PropsWithChildren) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
