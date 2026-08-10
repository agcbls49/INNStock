"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

// for dark mode switching
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"

export default function Navbar() {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    // for dark mode switching
    const { theme, setTheme } = useTheme();

    // function for logging out handles by better auth as well
    async function handleLogout() {
        await authClient.signOut();
        router.push("/login");
    }

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">
            {/* if user is logged in then prevent user from clicking my app to 
            go back to the login or landing page */}
            {session ? (
                <Link href="#" className="font-bold">
                    My App
                </Link> 
            ) : (
                <Link href="/" className="font-bold">
                    My App
                </Link>
            ) }

            {/* if user is logged in then show log out instead of sign up or log in button */}
            {session ? (
                <div>
                    <div className="flex gap-2">
                    {/* dark mode switch */}
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" className="font-bold">
                        Log Out
                    </Button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2">
                    {/* dark mode switch */}
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </Button>
                    {/* log in and sign up buttons */}
                    <Link href="/login">
                        <Button variant="outline" className="font-bold">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="font-bold">Sign Up</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}