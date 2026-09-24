"use client"

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

export default function ActionsBar() {
    return (
        <main className="flex m-10">
            <div className="flex gap-4">
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
                        Filter by Pheripherals
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                        <DropdownMenuLabel>Peripherals</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Monitor</DropdownMenuItem>
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
                        Filter by Stock Status
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
                        />
                    </Field>
                </div>
                {/* search button */}
                <div className="flex">
                    <Button variant="outline" className="p-4 hover:cursor-pointer">
                        <PackageSearch/> Search for an item 
                    </Button>
                </div>
            </div>

            {/* add item and download buttons */}
            <div className="flex gap-4 ml-4">
                <Button variant="outline" className="p-4 hover:cursor-pointer">
                    <PackagePlus /> Add an Item 
                </Button>
                <Button className="w-fit justify-self-center rounded-lg p-4 bg-orange-600 text-white hover:bg-orange-700 hover:text-white pointer-events-auto hover:cursor-pointer">
                    <ArrowDownToLine /> Download Product List
                </Button>
            </div>
        </main>
    );
}