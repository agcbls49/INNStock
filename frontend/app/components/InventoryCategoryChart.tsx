"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    type ChartConfig,
} from "@/components/ui/chart"

// colors the bars will cycle through
const barColors = ["#FF6900", "#000000", "#D4D4D4"];

// chart label for the tooltip
const chartConfig = {
    stock: {
        label: "Total",
    },
} satisfies ChartConfig

export function InventoryCategoryChart() {
    // holds the category data from the backend
    const [chartData, setChartData] = useState<{ category: string; stock: number }[]>([]);

    useEffect(() => {
        async function loadCategoryData() {
            try {
                const response = await fetch("http://localhost:4000/api/dashboard");
                if (!response.ok) { 
                    return; 
                }

                const result = await response.json();

                // list of { category, stock }
                setChartData(result.categories);
                } 
                catch (error) 
                {
                    console.error("Failed to load category data", error);
                }
            }

        loadCategoryData();
    }, [])

    return (
        <Card>
        <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-100 w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    interval={0}
                    angle={-65}
                    textAnchor="end"
                    height={100}
                />
                <ChartTooltip
                cursor={true}
                />
                <Bar 
                    dataKey="stock" 
                    name="Total" 
                    
                    shape={(props: any) => { 
                        const { x, y, width, height, index } = props; 
                        return (
                            <rect 
                                x={x} 
                                y={y} 
                                width={width} 
                                height={height} 
                                fill={barColors[index % barColors.length]} 
                                rx={8}
                                ry={8}
                            />
                        ); 
                    }} 
                />
            </BarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    );
}