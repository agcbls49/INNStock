// import database config and user table from schema folder
import { db } from "./db";
import { or, ilike, count } from "drizzle-orm";
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
        // http://localhost:4000/api/search?q=mouse
        const query = req.query.q as string;
        const filteredItems = await db.select().from(productsListTable)
            .where(or(
                ilike(productsListTable.productName, `%${query}%`), 
                ilike(productsListTable.category, `%${query}%`)
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
        const products = await db.select().from(productsListTable);

        const totalProducts = products.length;

        const totalStock = products.reduce(
            (sum, product) => sum + product.totalStocks, 0
        );

        const lowStock = products.filter(
            product => product.status === "Low Stock"
        ).length;

        const outOfStock = products.filter(
            product => product.status === "Out of Stock"
        ).length;

        const inventoryValue = products.reduce(
            (sum, product) => sum + (product.totalStocks * Number(product.itemPrice)), 0
        );

        // show only the top 5 product names for these two using slice 
        const lowStockProductName = products
            .filter(product => product.status === "Low Stock")
            .map(product => product.productName)
            .slice(0, 5);
        
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

    // download as csv option
    app.get("/api/products/download", async (_req: Request, res: Response) => {
        try {
            const products = await db.select().from(productsListTable);

            const header = "id,productName,skuNumber,category,totalStocks,itemPrice,status";

            const rows = products.map(product =>
                `${product.id},"${product.productName}","${product.skuNumber}","${product.category}",${product.totalStocks},${product.itemPrice},"${product.status}"`
            ).join("\n");

            const csv = `${header}\n${rows}`;

            res.setHeader("Content-Type", "text/csv; charset=utf-8");
            res.setHeader("Content-Disposition", 'attachment; filename="products.csv"');

            res.send(csv);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to download products" });
        }
    });

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}/`);
        });
    }

main().catch(err => {
    console.error("Startup Error:", err);
    process.exit(1);
});