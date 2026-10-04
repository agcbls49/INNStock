"use client";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Field,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { Funnel, PackageSearch, PackagePlus, ArrowDownToLine } from "lucide-react"

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

    // search feature
    const [searchQuery, setSearchQuery] = useState("");

    async function searchProducts() {
        // encodeURIComponent ensures that data put into the link is safe
        const response = await fetch(`http://localhost:4000/api/search?q=${encodeURIComponent(searchQuery)}`);
        const result = await response.json();
        // .product since my backend uses product as a list encapsulating the data or my database data
        setData(result.product);
    }

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
            const response = await fetch("http://localhost:4000/api/products");

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
            <div className="flex justify-center mt-10 mb-5">
                {/* actions bar */}
                <div className="flex gap-2">
                {/* filter by computer parts */}
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="p-4 hover:cursor-pointer" />}>
                            <Funnel/>
                            Filter by Computer Parts
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                            <DropdownMenuLabel>Computer Parts</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>CPU</DropdownMenuItem>
                            <DropdownMenuItem>CPU Cooler</DropdownMenuItem>
                            <DropdownMenuItem>Motherboard</DropdownMenuItem>
                            <DropdownMenuItem>Memory</DropdownMenuItem>
                            <DropdownMenuItem>Storage</DropdownMenuItem>
                            <DropdownMenuItem>Monitor</DropdownMenuItem>
                            <DropdownMenuItem>GPU</DropdownMenuItem>
                            <DropdownMenuItem>Case</DropdownMenuItem>
                            <DropdownMenuItem>Case Fans</DropdownMenuItem>
                            <DropdownMenuItem>PSU</DropdownMenuItem>
                            <DropdownMenuItem>Expansion Card</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* filter by peripherals */}
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="p-4 hover:cursor-pointer" />}>
                            <Funnel/>
                            Filter by Computer Accessories
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                            <DropdownMenuLabel>Computer Accessories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Webcam</DropdownMenuItem>
                            <DropdownMenuItem>Keyboard</DropdownMenuItem>
                            <DropdownMenuItem>Mouse</DropdownMenuItem>
                            <DropdownMenuItem>Mouse Pad</DropdownMenuItem>
                            <DropdownMenuItem>Headset</DropdownMenuItem>
                            <DropdownMenuItem>Speaker</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* stock status filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="p-4 hover:cursor-pointer" />}>
                            <Funnel/>
                            Filter by Product Stock Status
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                            <DropdownMenuLabel>Stock Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>In Stock</DropdownMenuItem>
                            <DropdownMenuItem>Low Stock</DropdownMenuItem>
                            <DropdownMenuItem>Out of Stock</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* search input */}
                    <div className="w-full max-w-sm">
                        <Field>
                            <Input
                                id="input-field-search"
                                type="text"
                                placeholder="e.g. Mouse"
                                className="p-4"
                                onChange={(e) => {
                                    // takes the value inputted by the user
                                    const value = e.target.value;
                                    // stores that value to be a search query
                                    setSearchQuery(value); 
                                    // if input field is empty then load all products 
                                    if (!value.trim()) {
                                        loadAllProducts();
                                    }
                                }}
                            />
                        </Field>
                    </div>
                    {/* search button */}
                    <div className="flex">
                        <Button className="p-4 hover:cursor-pointer"
                            // you need to click the search button to search now 
                            // unlike the previous code
                            onClick={searchProducts}>
                            <PackageSearch/> Search for a Product 
                        </Button>
                    </div>
                </div>

                {/* add item and download buttons */}
                <div className="flex gap-2 ml-2">
                    <Button className="p-4 hover:cursor-pointer">
                        <PackagePlus /> Add a Product 
                    </Button>
                    <Button className="w-fit justify-self-center rounded-lg p-4 bg-orange-600 text-white hover:bg-orange-700 hover:text-white pointer-events-auto hover:cursor-pointer">
                        <ArrowDownToLine /> Download Product List
                    </Button>
                </div>
            </div>
            
            {/* products table */}
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