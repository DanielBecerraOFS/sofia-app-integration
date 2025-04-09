import { DashboardAppbar, SidebarInset, SidebarProvider } from "@/shared/components";
import LeftSidebarMenu from "@/modules/home/components/Sidebar";
import { Outlet } from "react-router-dom";
import { FloatingButton } from "@/modules/sofia/router";

export default function HomeLayout() {
  return (
    <SidebarProvider>
      <LeftSidebarMenu />
      <SidebarInset className="bg-surface text-on-surface max-w-[100svw] w-svw h-full min-h-svh">
        <DashboardAppbar />
        <Outlet />
        <FloatingButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
