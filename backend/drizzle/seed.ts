import { db } from "../db";
import { user, productsListTable } from "./schema";
import { auth } from "../lib/auth";

async function seed() {
    console.log("Seeding users and products...");

    // delete all products
    await db.delete(productsListTable);

    // delete all users
    await db.delete(user);

    const admin = await auth.api.signUpEmail({
        body: {
            name: "Admin",
            email: "admin@example.com",
            password: "Admin123!",
        },
    });

    console.log("Admin created:", admin.user.email);

    await db.insert(productsListTable).values([
        {
            productName: "Logitech G102",
            skuNumber: "SKU-001",
            category: "Computer Parts",
            totalStocks: 25,
            itemPrice: "999.00",
            status: "In Stock",
        },
        {
            productName: "Kingston 16GB DDR4 RAM",
            skuNumber: "SKU-002",
            category: "Computer Parts",
            totalStocks: 12,
            itemPrice: "2780.00",
            status: "In Stock",
        },
        {
            productName: "Razer DeathAdder Essential",
            skuNumber: "SKU-003",
            category: "Computer Accessories",
            totalStocks: 0,
            itemPrice: "3540.00",
            status: "Out of Stock",
        },
    ]);

    console.log("Products created.");
    console.log("Seed completed!");
}

seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });