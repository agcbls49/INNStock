"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState, ReactElement } from "react";

type Product = {
    id: number;
    productName: string;
    skuNumber: string;
    category: string;
    totalStocks: number;
    itemPrice: number;
    status: string;
};

interface AddProductProps {
    onProductAdded: () => void;
}

interface EditProductProps {
    onProductEdit: () => void;
    product?: Product;
    children: ReactElement;
}

export default function ProductModal({ onProductAdded, onProductEdit, product, children }: AddProductProps & EditProductProps) {
    const [open, setOpen] = useState(false);

    const[productName, setProductName] = useState("");
    const[skuNumber, setSkuNumber] = useState("");
    const[category, setCategory] = useState("");
    const[totalStocks, setTotalStocks] = useState<number>(0);
    const[pricePerItem, setPricePerItem] = useState<number>(0);
    const[status, setStatus] = useState("");

    const computerParts = ["CPU", "CPU Cooler", "Motherboard","Memory", "Storage", "Monitor", 
        "GPU", "Case", "Case Fans", "PSU", "Expansion Card"];

    const computerAccessories = ["Webcam", "Keyboard", "Mouse", "Mouse Pad", 
        "Headset", "Speaker"];

    const statuses = ["In Stock", "Low Stock", "Out of Stock"];

    // clear all entries when close or save button is clicked
    function resetForm() {
        setProductName("");
        setSkuNumber("");
        setCategory("");
        setTotalStocks(0);
        setPricePerItem(0);
        setStatus("");
    }

    // when the modal opens for edit, fill the form with that product's values
    function handleOpenChange(isOpen: boolean) {
        if(isOpen && product) {
            setProductName(product.productName);
            setSkuNumber(product.skuNumber);
            setCategory(product.category);
            setTotalStocks(product.totalStocks);
            setPricePerItem(Number(product.itemPrice));
            setStatus(product.status);
        }
        if(!isOpen) resetForm();
        setOpen(isOpen);
    }

    async function handleSubmit() {
        if(productName.trim() === "" || skuNumber.trim() === "" || category.trim() === "" || totalStocks == null || pricePerItem == null || status.trim() === "") {
            alert("All fields are required.");
            return;
        }

        const response = await fetch("http://localhost:4000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productName: productName,
                skuNumber: skuNumber,
                category: category,
                totalStocks: Number(totalStocks),
                itemPrice: Number(pricePerItem),
                status: status
            }),
        });

        if (response.ok) {
            resetForm();
            setOpen(false);
            onProductAdded();
        }
    }

    async function handleEdit(id: number) {
        if(productName.trim() === "" || skuNumber.trim() === "" || category.trim() === "" || totalStocks == null || pricePerItem == null || status.trim() === "") {
            alert("All fields are required.");
            return;
        }

        const response = await fetch(`http://localhost:4000/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productName: productName,
                skuNumber: skuNumber,
                category: category,
                totalStocks: Number(totalStocks),
                itemPrice: Number(pricePerItem),
                status: status
            }),
        });

        if (response.ok) {
            resetForm();
            setOpen(false);
            onProductEdit();
        }
    }

    return(
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {/* the button from the table is the trigger, so it keeps its own look */}
            <DialogTrigger render={children} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-3">
                    <label className="text-sm">Product Name</label>
                    <Input value={productName} onChange={(e) => setProductName(e.target.value)} />

                    <label className="text-sm">SKU Number</label>
                    <Input value={skuNumber} onChange={(e) => setSkuNumber(e.target.value)} />

                    <label className="text-sm">Category</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="justify-start hover:cursor-pointer" />}>
                            {category || "Select a Category"}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                            <DropdownMenuLabel>Computer Parts</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {computerParts.map((part) => (
                                <DropdownMenuItem key={part} onClick={() => setCategory(part)}>
                                    {part}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Computer Accessories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {computerAccessories.map((accessory) => (
                                <DropdownMenuItem key={accessory} onClick={() => setCategory(accessory)}>
                                    {accessory}
                                </DropdownMenuItem>
                            ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <label className="text-sm">Total Stocks</label>
                    {/* show an empty box instead of 0 */}
                    <Input type="number" placeholder="0" value={totalStocks === 0 ? "" : totalStocks} onChange={(e) => setTotalStocks(Number(e.target.value))} />

                    <label className="text-sm">Price per Item</label>
                    {/* same fix total stocks */}
                    <Input type="number" placeholder="0" value={pricePerItem === 0 ? "" : pricePerItem} onChange={(e) => setPricePerItem(Number(e.target.value))} />

                    <label className="text-sm">Status</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="justify-start hover:cursor-pointer" />}>
                            {status || "Select a Status"}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                            <DropdownMenuLabel>Stock Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {statuses.map((item) => (
                                <DropdownMenuItem key={item} onClick={() => setStatus(item)}>
                                    {item}
                                </DropdownMenuItem>
                            ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => { resetForm(); setOpen(false); }}>Close</Button>
                    {/* edit if a product was passed in, else add */}
                    <Button onClick={() => product ? handleEdit(product.id) : handleSubmit()}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}