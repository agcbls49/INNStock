"use client";

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from "react";

type Product = {
    productName: string;
    skuNumber: string;
    category: string;
    totalStocks: number;
    itemPrice: number;
    status: string;
};

export default function ProductListCard() {

    const [data, setData] = useState<Product[]>([]);

    async function loadAllProducts() {
        try {
            const response = await fetch("http://localhost:4000/products");

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const result = await response.json();
            setData(result.product);
        }
        catch (e) {
            console.error(e);
            setData([]);
        }
    }

    useEffect(() => {
        loadAllProducts();
    }, []);

    return (
        <main className="ml-10 max-w-8xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>SKU Number</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Stocks</TableHead>
                        <TableHead>Price per Item</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* map() - function call that takes a callback function
                    show all products */}
                    {data.map((product) => (
                        <TableRow key={product.skuNumber}>
                            <TableCell className="font-medium">
                                {/* show product name */}
                                {product.productName}
                            </TableCell>
                            {/* show product sku number */}
                            <TableCell>{product.skuNumber}</TableCell>
                            {/* show product category */}
                            <TableCell>{product.category}</TableCell>
                            {/* show total number of stocks */}
                            <TableCell>{product.totalStocks}</TableCell>
                            {/* show product price per item or piece */}
                            <TableCell>₱ {product.itemPrice}</TableCell>
                            {/* show product stock status */}
                            <TableCell>{product.status}</TableCell>
                            {/* the action buttons */}
                            <TableCell>
                                <div className="flex gap-2">
                                    {/* edit button */}
                                    <Button variant="outline">
                                        Edit
                                    </Button>
                                    {/* delete button */}
                                    <Button variant="destructive">
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}