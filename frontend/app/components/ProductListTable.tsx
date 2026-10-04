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
import { ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
    productName: string;
    skuNumber: string;
    category: string;
    totalStocks: number;
    itemPrice: number;
    status: string;
};

export default function ProductListCard() {
    // data is all products
    // paginatedData is 10 products from the current page
    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // slice for creating a copy of an array
    const paginatedData = data.slice(
        // first index
        (currentPage - 1) * itemsPerPage, 
        // last index
        currentPage * itemsPerPage
    );

    // ceil for rounding number upward to nearest integer
    const totalPages = Math.ceil(data.length / itemsPerPage);

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
                    {paginatedData.map((product) => (
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
            
            {/* pagination buttons */}

            <div className="mt-10 flex items-center justify-center gap-2">
                <Button 
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    >
                    <ChevronLeft/>
                    Previous
                </Button>

                {/* _ used as placeholder because only index is needed */}
                {Array.from({ length: totalPages }, (_, index) => 
                    <Button 
                    key={index + 1} 
                    onClick={() => setCurrentPage(index + 1)}
                    variant={currentPage === index + 1 ? "default": "outline"}
                    >{index + 1}</Button>
                )}
                
                <Button 
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    >
                    Next
                    <ChevronRight/>
                </Button>
            </div>
        </main>
    );
}