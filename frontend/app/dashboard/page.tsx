"use client";

import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
    // if user already signed in then get the session
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    // if user tries to get into dashboard without logging in show this
    if (!session) {
        return <p className="text-center mt-20">You must be logged in to view this page.</p>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-4">
            {/* show the logged in user name and their email */}
            <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
            <p className="text-gray-500">{session.user.email}</p>
        </main>
    );
}