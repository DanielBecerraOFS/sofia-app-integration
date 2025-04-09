import {
  FileText,
  History,
  LayoutDashboard,
  TicketCheck,
  Route,
  Sparkle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/shared/components/index";
import OFILogo from "@/assets/images/logos/new-sofia-logo.png";
interface SidebarProps {
  isMobile?: boolean;
  collapsible?: string;
  side?: string;
  variant?: string;
  children?: React.ReactNode;
}

const LeftSidebarMenu: React.FC<SidebarProps> = () => {

  return (
    <Sidebar collapsible="offcanvas" side="left" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-auto max-h-[30px]"
            >
              <a href="#">
                <picture className="site-front-logo">
                  <source src={OFILogo} />
                  <img
                    src={OFILogo}
                    alt="Site front logo"
                    className="w-full h-8"
                  />
                </picture>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={"/app/overview"}>
                  <LayoutDashboard size={16} strokeWidth={1} />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Use Cases</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={"/app/free-text"}>
                  <FileText size={16} strokeWidth={1} />
                  <span>Free Text Analysis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={"/app/duplicate-invoice"}>
                  <TicketCheck size={16} strokeWidth={1} />
                  <span>Duplicated Invoice Checker</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={"/app/process-mining"}>
                  <Route size={16} strokeWidth={1} />
                  <span>Process Mining</span>
                </Link>
              </SidebarMenuButton>
              {/* <SidebarMenuButton asChild>
                <Link to={"/app/time-process"}>
                  <Timer size={16} strokeWidth={1} />
                  <span>Time Process</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link to={"/app/invoices"}>
                  <Receipt size={16} strokeWidth={1} />
                  <span>Invoices</span>
                </Link>
              </SidebarMenuButton> */}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>SOFIA Assistent</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
              <Link to={"/app/recomendations"}>
                  <Sparkle size={16} strokeWidth={1} />
                  <span>Recomendations</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <History size={16} strokeWidth={1} />
                  <span>History Logs</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mt-auto py-4">
          <div className="rounded-md bg-linear-to-r from-secondary to-on-secondary-container py-2 px-4">
            <p className="text-md font-medium text-on-secondary mb-2">
              Do you need assistance?
            </p>
            <p className="text-xs text-background mb-3">
              Contact our support team for help with your ProcessAI
              implementation.
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="w-full text-xs border border-on-secondary bg-on-secondary text-seconary hover:bg-background"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default LeftSidebarMenu;
