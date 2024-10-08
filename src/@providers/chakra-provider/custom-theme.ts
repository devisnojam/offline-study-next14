import { modalAnatomy } from "@chakra-ui/anatomy";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helper = createMultiStyleConfigHelpers(modalAnatomy.keys);

export const modalTheme = (() => {
  const { definePartsStyle, defineMultiStyleConfig } = helper;
  const sizes = {
    base: definePartsStyle({
      dialog: {
        width: { base: "100%", md: "400px" },
        height: { base: "100vh", md: "auto" },
        margin: 0,
        borderRadius: { base: 0, md: "12px" },
      },
      header: {
        fontSize: { base: "md", md: "lg" },
        textAlign: "center",
      },
    }),
  };
  return defineMultiStyleConfig({
    sizes,
    defaultProps: {
      size: "base",
    },
  });
})();

export const containerTheme = (() => {
  const sizes = {
    base: defineStyle({
      padding: { base: "1.25rem" },
    }),
  };

  return defineStyleConfig({
    sizes,
    defaultProps: {
      size: "base",
    },
  });
})();
