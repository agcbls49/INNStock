"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    // if user already signed in then get the session
    const { data: session, isPending } = authClient.useSession();

    const router = useRouter();

    if (isPending) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    // if user tries to get into dashboard without logging in redirect to login
    if (!session) {
        router.push("/login");
        return null;
    }

    return (
        <main className="fixed inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
            {/* show the logged in user name and their email */}
            <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
            <p className="text-gray-500">{session.user.email}</p>
        </main>
    );
}