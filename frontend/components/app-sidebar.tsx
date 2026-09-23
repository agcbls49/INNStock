"use client"

import { House, Package, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"

import { authClient } from "@/lib/auth-client";

export function AppSidebar() {

    const pathname = usePathname();

    // dont show sidebar in login and sign up pages
    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    return <SidebarWithSession />;
}

function SidebarWithSession() {

    const { data: session, isPending } = authClient.useSession();

    const pathname = usePathname();

    if (isPending) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    // if user tries to get into dashboard without logging in show this
    if (!session && pathname === "/dashboard") {
        return <p className="text-center mt-20">You must be logged in to view this page.</p>;
    }

    const items = [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: House,
        },
        {
            name: "Products",
            url: "/products",
            icon: Package,
        },
        {
            name: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ];
    
    return (
        // create sidebar
        <Sidebar>
            <div className="mt-10">
                {/* top of the sidebar */}
                <SidebarHeader />
                <div className="text-center justify-center text-lg font-bold">
                    {/* since the side bar is in all pages welcome as guest instead */}
                    Welcome, <span className='text-orange-500'>{session?.user?.name ?? "Guest"}!</span>
                </div>
            </div>
            
            {/* main body of sidebar */}
            <SidebarContent>
                {/* group related sidebar items */}
                <SidebarGroup>
                    {/* contains menu of items */}
                    <SidebarMenu className='mt-10 gap-5'>
                        {items.map((item) => (
                            // menu item inside the sidebar 
                            <SidebarMenuItem key={item.name}>
                                {/* clickable menu item button inside sidebar */}
                                <SidebarMenuButton isActive={pathname === item.url} className='w-full'>
                                    {/* navigate to the pages and highlight if user is active on that page */}
                                    <Link href={item.url} className="flex ml-10 gap-3 w-full">
                                        <item.icon className="size-5"/>
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* bottom of sidebar */}
            <SidebarFooter />
        </Sidebar>
    )
}