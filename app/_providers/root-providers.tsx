"use client";

import { ChakraProvider } from "@chakra-ui/react";

/**
 * @description 필요한 provider 정의
 */
export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
