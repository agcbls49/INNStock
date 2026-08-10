import { db } from "../db";
import { user } from "./schema";
import { auth } from "../lib/auth";

async function seed() {
    console.log("Seeding users...");

    // delete all users
    await db.delete(user);

    const admin = await auth.api.signUpEmail({
        body: {
            name: "Admin",
            email: "admin@example.com",
            password: "Admin123!",
        },
    });

    const testUser = await auth.api.signUpEmail({
        body: {
            name: "Test User",
            email: "test@example.com",
            password: "Test123!",
        },
    });

    console.log("Admin created:", admin.user.email);
    console.log("Test user created:", testUser.user.email);
    console.log("Seed completed!");
}

seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });