"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { authClient } from "@/lib/auth-client";

export function AppSidebar() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    // if user tries to get into dashboard without logging in show this
    if (!session) {
        return <p className="text-center mt-20">You must be logged in to view this page.</p>;
    }
    
    return (
        <Sidebar>
            <div className="mt-10">
                {/* top of the sidebar */}
                <SidebarHeader />
                <div className="text-center justify-center text-lg font-bold">
                    Welcome, {session.user.name}!
                </div>
            </div>
            
            {/* sidebar content */}
            <SidebarContent>
                <div className="mt-10 bg-orange-500 p-5">

                </div>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            {/* bottom of sidebar */}
            <SidebarFooter />
        </Sidebar>
    )
}