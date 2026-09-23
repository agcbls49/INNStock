"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// this is the routes where the sidebar wont be shown to the user regardless of session
const NO_SIDEBAR_ROUTES = ["/", "/login", "/signup"];

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideSidebar = NO_SIDEBAR_ROUTES.includes(pathname);

    if (hideSidebar) return <>{children}</>;

    return (
        <SidebarProvider>
        <AppSidebar />
        {children}
        </SidebarProvider>
    );
}