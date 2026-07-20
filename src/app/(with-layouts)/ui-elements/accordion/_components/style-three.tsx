import { accordionData } from "@/app/(with-layouts)/ui-elements/accordion/_components/data";
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "@/components/tailgrids/core/accordion";

export function StyleThree() {
  return (
    <AccordionRoot variant="style_three">
      {accordionData.map((item) => (
        <AccordionItem key={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
