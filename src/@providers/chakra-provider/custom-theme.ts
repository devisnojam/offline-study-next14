import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

export const modalTheme = () => {
  const modalBaseStyle = definePartsStyle({
    overlay: {},
    dialog: {
      width: "100%",
      minHeight: "100vh",
      md: {
        maxWidth: "1200px",
      },
    },
  });
  return defineMultiStyleConfig({
    baseStyle: modalBaseStyle,
  });
};
