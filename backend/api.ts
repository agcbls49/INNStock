// import database config and user table from schema folder
import { db } from "./db";
import { productsListTable, user } from "./drizzle/schema";

// import express data types and cors
import express, { Request, Response } from "express";
import cors from "cors";

// import Better Auth's Express/Node adapter
import { toNodeHandler } from "better-auth/node";
// Better Auth configuration
import { auth } from "./lib/auth";
import { or, ilike } from "drizzle-orm";

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

    // go to localhost /products to see all products
    app.get("/products", async (_req: Request, res: Response) => {
        const data = await db.select().from(productsListTable);
        // this sends all product details
        res.json({product: data});
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