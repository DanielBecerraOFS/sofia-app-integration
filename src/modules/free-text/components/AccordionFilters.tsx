import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/index";
import { ScrollArea } from "@/shared/components/index";

export default function AccordionFilters() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Order ID</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="min-h-20 max-h-60 w-full border-l-1 border-amber-400 px-4">
            <p className="cursor-pointer">A</p>
            <p className="cursor-pointer">B</p>
            <p className="cursor-pointer">C</p>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Order Date</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="min-h-20 max-h-60 w-full border-l-1 border-amber-400 px-4">
          <p className="cursor-pointer">date</p>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Material Code</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="min-h-20 max-h-60 w-full border-l-1 border-amber-400 px-4">
          <p className="cursor-pointer">Material Code</p>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
