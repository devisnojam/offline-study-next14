import { Accordion, AccordionProps } from "@chakra-ui/react";

interface Props extends AccordionProps {
  children: React.ReactNode;
}

export default function KanbanGroup({ children, ...props }: Props) {
  return (
    <Accordion allowMultiple {...props}>
      {children}
    </Accordion>
  );
}
