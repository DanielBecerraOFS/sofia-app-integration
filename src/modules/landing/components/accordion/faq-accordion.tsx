import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

export default function AccordionFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How do credits work with SOFIA?</AccordionTrigger>
        <AccordionContent>
          Credits enable SOFIA to activate features like learning and
          understanding your business processes. They empower SOFIA to generate
          recommendations, real-time alerts, and contextual chat interactions.
          Each action—whether it's a chat message or content generation—uses a
          small amount of credits. You can monitor your credit usage in real
          time and easily top up to keep your workflows running smoothly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can SOFIA integrate with my SAP?</AccordionTrigger>
        <AccordionContent>
          Absolutely! SOFIA natively integrates with over 30 tools and can also
          connect to your favorite APIs. Whether it's SAP, ARM, or any other
          platform, SOFIA helps you build seamless workflows with ease.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What can the SOFIA Chat do for my business?
        </AccordionTrigger>
        <AccordionContent>
          The Chat with SOFIA is an AI-powered assistant enable 24/7 for your
          business. It can answer frequently asked questions, collect critical
          data, and guide users through your data analysis. Its advanced
          contextual and conversational abilities ensure the easy-way
          comprenssion of use case.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
