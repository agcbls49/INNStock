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

import { useState, useEffect } from "react";

import { StockStatusChart } from "../components/StocksStatusChart";
import { InventoryCategoryChart } from "../components/InventoryCategoryChart";

export default function DashboardPage() {
    // if user already signed in then get the session
    const { isPending } = authClient.useSession();

    // dashboard counts
    const [totalProductCount, setTotalProductCount] = useState(0);
    const [totalStockCount, setTotalStockCount] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [outofStockCount, setOutofStockCount] = useState(0);
    const [inventoryValue, setInventoryValue] = useState(0);
    const [lowStockProductName, setLowStockProductName] = useState<string[]>([]);
    const [outOfStockProductName, setOutOfStockProductName] = useState<string[]>([]);

    useEffect(() => {
        async function loadProductCount() {
            try {
                const response = await fetch("http://localhost:4000/api/dashboard");
                if (!response.ok) return;

                const result = await response.json();

                setTotalProductCount(result.totalProducts);
                setTotalStockCount(result.totalStock);
                setLowStockCount(result.lowStock);
                setOutofStockCount(result.outOfStock);
                setInventoryValue(result.inventoryValue);
                setLowStockProductName(result.lowStockProductName);
                setOutOfStockProductName(result.outOfStockProductName);
            } catch (error) {
                console.error("Failed to load product count", error);
            }
        }

        loadProductCount();
    }, []);

    
    if (isPending) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <main className="ml-10 mt-5 min-h-screen flex flex-col items-center justify-start gap-8 overflow-auto p-0.5 pointer-events-auto">
            {/* the bar and donut chart on top */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="w-full">
                    <InventoryCategoryChart />
                </div>
                <div className="w-full">
                    <StockStatusChart />
                </div>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">    
                {/* total products card */}
                <Card className="w-full max-w-xs justify-self-center mb-15 h-50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="mt-2 text-2xl">{totalProductCount}</h1>
                        {/* download product list button */}
                        <Button className="justify-self-center mt-8 rounded-lg p-5 w-full bg-orange-600 text-white hover:bg-orange-700 hover:text-white pointer-events-auto hover:cursor-pointer"
                            onClick={() => { window.location.href = "http://localhost:4000/api/products/download"; }}>
                            <ArrowDownToLine /> Download Product List
                        </Button>
                    </CardContent>
                </Card>

                {/* inventory value card */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-orange-500 text-white h-50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Inventory Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* need to add toLocalString to add , or else it would be plain integer*/}
                        <h1 className="mt-6 font-extrabold text-4xl">₱ {inventoryValue.toLocaleString()}</h1>
                    </CardContent>
                </Card>

                {/* low in stock product */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-[#D4D4D4] h-80">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Top 5 Products Low in Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg">
                            {lowStockProductName.map((name, index) => (
                                <div key={index}>{name}</div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* out of stock product */}
                <Card className="w-full max-w-xs justify-self-center mb-15 bg-black h-80 text-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Top 5 Products Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg">
                            {outOfStockProductName.map((name, index) => (
                                <div key={index}>{name}</div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}