import { useState } from "react";
import {
  SlidersHorizontal,
} from "lucide-react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sidebar,
  SidebarGroupContent,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/index";

export default function FiltersPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="data-[state=open]:bg-secondary-container border-secondary hover:bg-secondary-container hover:text-on-secondary-container"
        >
          <SlidersHorizontal />
          <p className="hidden md:inline-block pr-2">Filters</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 overflow-hidden rounded-lg p-0"
        align="end"
      >
        <Sidebar collapsible="none" className="bg-transparent">
          <SidebarGroupContent>
            <Accordion type="single" collapsible className="w-full px-2 py-4">
              <AccordionItem
                value="item-1"
                className="border-b-1 px-1 mb-2 rounded-none"
              >
                <AccordionTrigger>Orders ID</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="border-b-1 px-1 mb-2 rounded-none"
              >
                <AccordionTrigger>Orders Date</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="border-b-1 px-1 mb-2 rounded-none"
              >
                <AccordionTrigger>Material Name</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-4"
                className="border-b-1 px-1 mb-2 rounded-none"
              >
                <AccordionTrigger>Material Code</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-5"
                className="border-b-1 px-1 mb-2 rounded-none"
              >
                <AccordionTrigger>Status</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroupContent>
        </Sidebar>
      </PopoverContent>
    </Popover>
  );
}
