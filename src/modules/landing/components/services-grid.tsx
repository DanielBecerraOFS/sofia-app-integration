import {
    BellIcon,
    CalendarIcon,
  } from "@radix-ui/react-icons";
  
  import { BentoCard, BentoGrid } from "@/shared/components/magicui/bento-grid";
import { Route, TextCursorInput, TicketCheck } from "lucide-react";
  
  const features = [
    {
      Icon: Route,
      name: "Proccess Mining",
      description: "It helps your organization uncover inefficiencies and optimize workflows by providing detailed insights into process execution.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: TextCursorInput,
      name: "Free Text Analysis",
      description: "Identifies match free-text PR items to the catalog or to past purchase order items with a similar text description for wich materials and/or suppliers exits.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: TicketCheck,
      name: "Duplicate invoice checker",
      description: "Review potential duplicates invoices and take action to prevent unnecessary payments and streamline invoice processing",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Realtime Alerts",
      description:
        "Get notified when some on your integration data get wrong.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
  ];
  
  export default function ServicesGrid() {
    return (
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    );
  }
  