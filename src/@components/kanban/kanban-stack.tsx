"use client";

import { breakpoints } from "@/@providers/chakra-provider";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

interface Props {
  stackTitle: string;
  titleBgColor?: string;
  panelBgColor?: string;
}

export default function KanbanStack({
  children,
  stackTitle,
  titleBgColor,
  panelBgColor,
}: PropsWithChildren<Props>) {
  return (
    <StyledAccordionItem flexGrow={1} maxWidth={{ base: "full", lg: "300px" }}>
      <AccordionButton
        backgroundColor={titleBgColor}
        _hover={{ backgroundColor: titleBgColor }}
      >
        <Box as="span" flex="1" textAlign="center">
          {stackTitle}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel
        height={{ base: "300px", lg: "500px" }}
        padding={0}
        paddingInlineStart={0}
        paddingInlineEnd={0}
        overflowY="scroll"
        backgroundColor={panelBgColor}
      >
        <VStack px={5} py={5} spacing={4}>
          {children}
        </VStack>
      </AccordionPanel>
    </StyledAccordionItem>
  );
}

const StyledAccordionItem = styled(AccordionItem)`
  @media (min-width: ${breakpoints.lg}) {
    .chakra-collapse {
      height: auto !important;
      display: block !important;
      opacity: 1 !important;
    }
  }
`;
