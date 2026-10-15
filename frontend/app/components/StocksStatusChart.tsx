"use client"

import { useState, useEffect } from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// labels and colors for the two slices
const chartConfig = {
  count: {
    label: "Products",
  },
  lowStock: {
    label: "Low Stock",
    color: "#D4D4D4",
  },
  outOfStock: {
    label: "Out of Stock",
    color: "#000000",
  },
} satisfies ChartConfig

export function StockStatusChart() {
    // sum of all stock units, shown in the middle of the donut
    const [totalStock, setTotalStock] = useState(0);
    // the slices of the donut
    const [chartData, setChartData] = useState<{ status: string; count: number; fill: string }[]>([]);

    useEffect(() => {
      async function loadStockData() {
        try {
          const response = await fetch("http://localhost:4000/api/dashboard");
          if (!response.ok) { 
            return; 
          }

          const result = await response.json();

          setTotalStock(result.totalStock);
          // build the slices straight from the response
          // (backend sends outOfStock with a capital S)
          setChartData([
            { status: "lowStock", count: result.lowStock, fill: "var(--color-lowStock)" },
            { status: "outOfStock", count: result.outOfStock, fill: "var(--color-outOfStock)" },
          ]);

        } 
        catch (error) 
        {
          console.error("Failed to load stock data", error);
        }
      }

      loadStockData();
    }, [])

    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Stock Status</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-86.75"
          >
            <PieChart>
              {/* hover shows the status name and its product count */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                {/* text in the hole of the donut: total stock */}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalStock.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Stock
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* legend */}
          <div className="my-4 flex justify-center gap-6 text-sm">
            {chartData.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor:
                      chartConfig[item.status as "lowStock" | "outOfStock"].color,
                  }}
                />
                {chartConfig[item.status as "lowStock" | "outOfStock"].label}: {item.count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
}