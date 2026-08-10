import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { user, session, account, verification } from "../drizzle/schema";

// Better Auth configuration
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        // use the 4 tables in the schema file
        schema: { user, session, account, verification },
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: ["http://localhost:3000"],
});