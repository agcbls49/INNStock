"use client";

import { useState } from "react";
import { AuthProvider } from "@better-auth-ui/react";
import { ChangePassword } from "@/components/auth/settings/security/change-password";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Trash2 } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
    const [inputValue, setInputValue] = useState<string>('');
    
    // for showing password
    const [isView, setIsView] = useState(false);

    const router = useRouter();

    // for the input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const deleteAccount = async (userPassword : string) => {
        // prevent instant delete or log out when button is pressed
        if (!userPassword) {
            return alert("Password input required for account deletion");
        }

        // delete the account
        const { error } = await authClient.deleteUser({ 
            password: userPassword 
        });

        if (error) {
            console.log(error);
            return;
        }
        // sign out the session so it doesnt redirect to dashboard
        await authClient.signOut();

        // send user to login page
        router.replace("/login");
    };

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
            <div className="m-20 w-150 space-y-10">
                <ChangePassword />
                {/* delete account needs that user password */}
                <Card className="bg-destructive/5">
                    <CardHeader>
                        <CardTitle>Delete Account</CardTitle>
                        <CardDescription className="text-red-500">This action is permanent!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Input
                            placeholder="Enter your password" 
                            id="password" 
                            type={isView ? "text" : "password"}
                            value={inputValue} 
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            onClick={() => setIsView(!isView)}
                            className="relative -left-12 z-10 rounded-lg bg-black p-2 h-8 text-white hover:opacity-75">
                            {isView ? (
                                <Eye className="h-4 w-4" />
                                    ) : (
                                <EyeOff className="h-4 w-4" />
                            )}
                        </button>
                        <Button variant="destructive" 
                            className="p-3 h-8.5" 
                            onClick={() => deleteAccount(inputValue)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AuthProvider>
    );
}