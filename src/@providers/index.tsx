import ChakraProvider from "./chakra-provider";

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
