import ChakraUIProvider from "./chakra-ui-provider";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChakraUIProvider>{children}</ChakraUIProvider>
    </>
  );
}
