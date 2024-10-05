"use client";

import { ChakraProvider as Provider, extendTheme } from "@chakra-ui/react";
import { modalTheme } from "./custom-theme";

export const breakpoints = {
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
      "*": {
        border: "none",
      },
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
    Modal: modalTheme,
  },
  breakpoints,
});

export default function ChakraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider theme={theme}>{children}</Provider>;
}
