"use client";

import { AuthProvider } from "@better-auth-ui/react";
import { ChangePassword } from "@/components/auth/settings/security/change-password";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <AuthProvider
            authClient={authClient}
            // fuck this piece of shit only need because i use fucking better auth react form for navigation
            // this is navigation on page only which is separate from actually signing out which s handled by 
            // better auth in the change-password.tsx file which uses next navigation (redirect to login) that is also passed here 
            navigate={({ to, replace }) => {
                if (replace) {
                    // Go to this page, and don't let the user go Back to the page they were just on
                    router.replace(to);
                } else {
                    // Go to this page, but let the user press Back to return to the previous page
                    router.push(to);
                }
            }}
            redirectTo="/dashboard"
        >
            <div className="m-20 w-150">
                <ChangePassword />
            </div>
        </AuthProvider>
    );
}