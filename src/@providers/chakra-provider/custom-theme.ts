import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const {
  definePartsStyle: modalPartsStyle,
  defineMultiStyleConfig: modalMultiStyleConfig,
} = createMultiStyleConfigHelpers(modalAnatomy.keys);

export const modalTheme = (() => {
  const modalBaseStyle = modalPartsStyle({
    overlay: {},
    dialog: {
      width: "100%",
      minHeight: "100vh",
      margin: 0,
    },
  });

  const md = modalPartsStyle({
    dialog: {
      width: "initial",
      minHeight: "initial",
    },
  });

  return modalMultiStyleConfig({
    baseStyle: modalBaseStyle,
    sizes: { md },
  });
})();
