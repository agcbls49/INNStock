// import database config and user table from schema folder
import { db } from "./db";
import { or, ilike, count, eq, and, inArray } from "drizzle-orm";
import { productsListTable, user } from "./drizzle/schema";

// import express data types and cors
import express, { Request, Response } from "express";
import cors from "cors";

// import Better Auth's Express/Node adapter
import { toNodeHandler } from "better-auth/node";
// Better Auth configuration
import { auth } from "./lib/auth";

async function main() {
    const app = express();

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    // connects Better Auth routes to Express
    /* 
        app.all() means: Handle all HTTP methods (GET, POST etc.) matching this path
        *splat means: Match anything after /api/auth/
    */
    app.all("/api/auth/*splat", toNodeHandler(auth));

    app.use(express.json());

    // show all users from the table users
    // go to localhost /api to see all users, in this case only 1 
    app.get("/api", async(_req: Request, res: Response) => {
        const data = await db.select().from(user);
        res.json({ users: data });
    });

    // for the search feature
    app.get("/api/search", async(req: Request, res: Response) => {
        // req.query.q for http://localhost:4000/api/search?q=mouse
        // Read the search text from the address, use "" if there is none
        const query = (req.query.q as string) ?? "";

        // since the frontend has two dropdowns while database only has one category
        // if a category is set then split it else its an empty array or list 
        const category = req.query.category ? (req.query.category as string).split(",") : [];
        
        // for searching with the drop down menus (example: ?status=Low Stock)
        const status = req.query.status as string | undefined;

        const filteredItems = await db.select().from(productsListTable)
            .where(and(or(
                ilike(productsListTable.productName, `%${query}%`), 
                ilike(productsListTable.category, `%${query}%`)
            ),
                // you cant do normal code here it has to be ternary
                // checks for how many categories applied then makes the request to the database
                category.length > 0 ? inArray(productsListTable.category, category) : undefined,    
                // show products with status else if empty then show all statuses
                status && status !== "" ? eq(productsListTable.status, status) : undefined,    
            ))
            .limit(10);
        
        res.json({ product: filteredItems });
    });

    // get products count for the dashboard 
    app.get("/api/products/count", async (_req: Request, res: Response) => {
        const result = await db.select({ count: count() }).from(productsListTable);
        res.json({ count: result[0].count });
    }); 

    // dashboard counts
    app.get("/api/dashboard", async (_req: Request, res: Response) => {
        // Get every product from the database 
        const products = await db.select().from(productsListTable);
        // Count how many products are in the list
        const totalProducts = products.length;

        // reduce transforms an entire array into a single output value (such as a number, string, object, or another array)
        const totalStock = products.reduce(
            // sum is the running total, product is the current item
            // 0 at the end means the total starts at zero
            (sum, product) => sum + product.totalStocks, 0
        );

        // filter creates a new array containing only the 
        // elements from the original array that are marked "Low Stock"
        const lowStock = products.filter(
            product => product.status === "Low Stock"
        ).length;

        // same logic as before but for out of stock products
        const outOfStock = products.filter(
            product => product.status === "Out of Stock"
        ).length;

        // product stock * its price then combine into one total
        // Number() makes sure the price is a number not a string
        const inventoryValue = products.reduce(
            (sum, product) => sum + (product.totalStocks * Number(product.itemPrice)), 0
        );

        // show only the top 5 product names for these two using slice 
        const lowStockProductName = products
            // get only the low stock products
            .filter(product => product.status === "Low Stock")
            // get only the product names
            .map(product => product.productName)
            // keep only the first five product names
            .slice(0, 5);
        
        // same logic as above but for out of stock product names
        const outOfStockProductName = products
            .filter(product => product.status === "Out of Stock")
            .map(product => product.productName)
            .slice(0, 5);    

        res.json({
            totalProducts,
            totalStock,
            lowStock,
            outOfStock,
            inventoryValue,
            lowStockProductName,
            outOfStockProductName
        });
    });
    
    // gets all products
    app.get("/api/products", async (_req: Request, res: Response) => {
        const data = await db.select().from(productsListTable);
        // this sends all product details
        res.json({product: data});
    }); 

    // create a product
    app.post("/api/products", async(req: Request, res: Response) => {
        const { productName , skuNumber, category, totalStocks, itemPrice, status }:
        { productName:string , skuNumber:string, category:string, totalStocks:number, itemPrice:number, status:string} 
        = req.body;

        if(!productName || !skuNumber || !category || !totalStocks || !itemPrice || !status) {
            return res.status(400).json({ message:"All fields required" });
        }

        try {
            const newProduct = {
                productName,
                skuNumber,
                category,
                totalStocks,
                itemPrice,
                status,
            } as any;

            const result = await db.insert(productsListTable).values(newProduct);

            res.status(201).json(result);
        }
        catch(e:any) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error"});
        }
    });

    // update product
    app.put("/api/products/:id", async(req: Request, res: Response) => {
        // get the id of product that the user is going to edit 
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const { productName , skuNumber, category, totalStocks, itemPrice, status }:
        { productName?:string , skuNumber?:string, category?:string, totalStocks?:string | number, itemPrice?:string | number, status?:string } 
        = req.body;

        if(productName === undefined || skuNumber === undefined || category === undefined || 
            totalStocks === undefined || itemPrice === undefined || status === undefined) {
            return res.status(400).json({ message:"All fields required" });
        }

        try {
            const result = await db.update(productsListTable).set({
                productName,
                skuNumber,
                category,
                totalStocks: Number(totalStocks),
                // had to convert this to string because drizzle uses string
                // for numeric in postgresql
                itemPrice: String(itemPrice),
                status,
            })
            // where ensures that it updates only this product with this id
            .where(eq(productsListTable.id, id))
            // give back the updated or edited product
            .returning();

            if (result.length === 0) {
                return res.status(404).json({ message: "Product not found" });
            }

            // send the updated product to the browser
            res.status(200).json(result[0]);
        }
        catch(e:any){
            console.error(e);
            res.status(500).json({ error: "Internal server error" });
        }   
    });

    // download as csv option
    app.get("/api/products/download", async (_req: Request, res: Response) => {
        try {
            // Get every product from the database
            const products = await db.select().from(productsListTable);
            // First line of the file which are the column names
            const header = "id,productName,skuNumber,category,totalStocks,itemPrice,status";

            // Turn every product into one line of text
            const rows = products.map(product =>
                `${product.id},"${product.productName}","${product.skuNumber}","${product.category}",${product.totalStocks},${product.itemPrice},"${product.status}"`
                // Put each line on its own row
            ).join("\n");

            // Header/columns on top, rows below it
            const csv = `${header}\n${rows}`;

            // this is needed for the browser for it to know its a csv file
            res.setHeader("Content-Type", "text/csv; charset=utf-8");
            // tell browser to download it as products.csv 
            // instead of showing it on the page
            res.setHeader("Content-Disposition", 'attachment; filename="products.csv"');
            // send the file
            res.send(csv);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to download products" });
        }
    });

    // delete a product
    app.delete("/api/products/:id", async(req: Request, res: Response) => {
        // get the id of product that the user is going to delete 
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        try {
            await db.delete(productsListTable).where(eq(productsListTable.id, id));
            res.status(200).json({ message: "Product successfully deleted!" });
        }
        catch(e:any){
            console.error(e);
            res.status(500).json({ error: "Internal server error" });
        }
    });

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}/api`);
        });
    }

main().catch(err => {
    console.error("Startup Error:", err);
    process.exit(1);
});