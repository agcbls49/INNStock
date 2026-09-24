"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowDownToLine } from "lucide-react"

export default function DashboardPage() {
    // if user already signed in then get the session
    const { isPending } = authClient.useSession();

    if (isPending) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <main className="fixed inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none overflow-auto p-4">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* total products card */}
                <Card className="w-full max-w-xs justify-self-center mb-15">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">0</h1>
                    </CardContent>
                </Card>

                {/* total stock card */}
                <Card className="w-full max-w-xs justify-self-center mb-15">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Total Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">0</h1>
                    </CardContent>
                </Card>

                {/* low stock card */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-yellow-500">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Low Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">0</h1>
                    </CardContent>
                </Card>

                {/* out of stock card */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-red-500">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">0</h1>
                    </CardContent>
                </Card>

                {/* download product list button */}
                <Button className="w-fit justify-self-center mt-8 rounded-lg p-5 bg-orange-600 text-white hover:bg-orange-700 hover:text-white pointer-events-auto hover:cursor-pointer mb-15">
                    <ArrowDownToLine /> Download Product List
                </Button>

                {/* inventory value card */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-green-600">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Inventory Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">₱ 0</h1>
                    </CardContent>
                </Card>

                {/* low in stock product */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-yellow-500">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Products Low in Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">Mouse</h1>
                    </CardContent>
                </Card>

                {/* out of stock product */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-red-500">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Products Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-2xl">Keyboard</h1>
                    </CardContent>
                </Card>

                
            </div>
        </main>
    );
}