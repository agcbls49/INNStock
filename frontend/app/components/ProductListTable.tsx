import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function ProductListCard() {

    const products = [
        {
            productName: "Logitech G102",
            skuNumber: "SKU-001",
            category: "Computer Parts",
            totalStocks: 25,
            price: "₱999",
            status: "In Stock",
        },
        {
            productName: "Kingston 16GB DDR4 RAM",
            skuNumber: "SKU-002",
            category: "Computer Parts",
            totalStocks: 12,
            price: "₱2,780",
            status: "In Stock",
        },
        {
            productName: "Razer DeathAdder Essential",
            skuNumber: "SKU-003",
            category: "Computer Accessories",
            totalStocks: 0,
            price: "₱3,540",
            status: "Out of Stock",
        },
    ]

    return(
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
                    {products.map((product) => (
                        <TableRow key={product.skuNumber}>
                            <TableCell className="font-medium">
                                {product.productName}
                            </TableCell>
                            <TableCell>{product.skuNumber}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.totalStocks}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.status}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline">
                                        Edit
                                    </Button>
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