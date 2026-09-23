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
    return <SidebarWithSession />;
}

function SidebarWithSession() {

    const { data: session } = authClient.useSession();

    const pathname = usePathname();

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
        <Sidebar className='top-16'>
            <div className="mt-10">
                {/* top of the sidebar */}
                <SidebarHeader />
                <div className="text-center justify-center text-lg font-bold">
                    {/* since the side bar is in all pages welcome as guest instead */}
                    Welcome, <span className='text-orange-500'>{session?.user.name}!</span>
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