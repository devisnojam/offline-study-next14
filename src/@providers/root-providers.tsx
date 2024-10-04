"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        minHeight: "100vh",
      },
    },
  },
  components: {
    VStack: {
      baseStyle: {
        px: 0,
        py: 0,
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
      },
    },
  },
  breakpoints,
});

/**
 * @description 필요한 provider 정의
 */
export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
