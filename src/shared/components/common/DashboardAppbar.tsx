import { Bell, BookMarked, ChevronDown, Menu, Search } from "lucide-react";
import { Button, Input, TooltipInfoHover, ToggleTheme, SidebarTrigger } from "@/shared/components/index";
import { AssistentSheet } from "@/modules/sofia/router";

export default function DashboardAppbar() {
  return (
    <div className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 flex h-14 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex items-center justify-between px-2 w-full">
        <div className="navbar-brand flex flex-row gap-3 justify-start items-center">
        <SidebarTrigger className="-ml-1" />
          <h1 className="font-bold tracking-tight">
            Dashboard
          </h1>
        </div>
        <div className="appbar-cta flex items-center justify-between gap-4">
          <div className="input-search flex-row gap-2 justify-center items-center hidden md:flex border-1 border-secondary bg-on-secondary rounded-md px-2">
            <Search className="text-on-surface-variant" />
            <Input
              type="search"
              placeholder="Search processes"
              className="border-none outline-none focus-visible:ring-0 focus-visible:border-none"
            />
          </div>
          <AssistentSheet type="appbar-button" initialMessage="" params={{}} />
          <TooltipInfoHover
            title="Documentation"
            action={null}
            content=""
            className="hidden md:inline-flex"
          >
            <Button
              variant="secondaryOutline"
              size="icon"
              className="cursor-pointer p-0 px-0 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <BookMarked className="cursor-pointer" strokeWidth={2} size={16}/>
            </Button>
          </TooltipInfoHover>
          <TooltipInfoHover
            title="Alerts"
            action={null}
            content=""
            className="hidden md:inline-flex"
          >
            <Button
              variant="secondaryOutline"
              size="icon"
              className="cursor-pointer p-0 px-0 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <Bell className="cursor-pointer" strokeWidth={2} size={16} />
            </Button>
          </TooltipInfoHover>
          <TooltipInfoHover title="Theme" action={null} content="">
            <ToggleTheme />
          </TooltipInfoHover>
          <TooltipInfoHover
            title="Profile"
            action={null}
            content=""
            className="hidden md:inline-flex"
          >
            <Button variant="ghost" className="cursor-pointer p-0 px-0 ">
              <picture className="site-front-logo rounded-full">
                <source src="https://placehold.co/30x30" />
                <img
                  src="https://placehold.co/30x30"
                  alt="Site front logo"
                  width={30}
                  height={30}
                />
              </picture>
              <div className="profile-metadata flex flex-col items-start gap-0 mx-2">
                <p className="text-s">user</p>
                <p className="text-xs ">@sofiatech.com</p>
              </div>
              <ChevronDown strokeWidth={2} size={12} />
            </Button>
          </TooltipInfoHover>
          <TooltipInfoHover
            title="Menu"
            action={null}
            content=""
            className="md:hidden"
          >
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer p-0 px-0 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <Menu />
            </Button>
          </TooltipInfoHover>
        </div>
      </div>
    </div>
  );
}
