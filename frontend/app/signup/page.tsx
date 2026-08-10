"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // for showing password
    const [isView, setIsView] = useState(false);

    // used to route or redirect user to dashboard page once logged in 
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        // to sign up with the user information
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        });

        if (error) {
            setError("Invalid email or password");
            console.log(error);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-5">
            <div className="space-y-2">
                <Label htmlFor="name" className="font-bold">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={isView ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* show password icon */}
                    <button
                        type="button"
                        onClick={() => setIsView(!isView)}
                        className="absolute right-3 top-1/2 -translate-y-1/2">
                        {/* is view default false so if clicked then turn it to true which shows eye icon and the password into text form
                            else if clicked again then set true to false which shows the eye closed icon and the password into dots form */}
                        {isView ? (
                            <Eye className="h-4 w-4" />
                        ) : (
                            <EyeOff className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Create an Account</Button>
        </form>
    );
}