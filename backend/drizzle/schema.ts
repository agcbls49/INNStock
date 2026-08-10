import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    // unique user id. its default is text for better auth and it handles it too
    id: text("id").primaryKey(),
    // display name of user
    name: text("name").notNull(),
    // no two accounts can share the same email
    email: text("email").notNull().unique(),
    // email confirmed? this is for email verification. 
    /* default value is set to false because i dont have emails yet */
    emailVerified: boolean("email_verified").notNull().default(false),
    // when the accounts where created or updated. these are auto filled
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
    // unique id for THIS login session
    id: text("id").primaryKey(),
    // when this login expires and when user gets logged out automatically
    expiresAt: timestamp("expires_at").notNull(),
    // separate random secret string. gets sent to the browser 
    // and stored as a cookie to prove user is logged in in this session
    token: text("token").notNull().unique(),
    // this gets created when someone successfully logs in. handled by Better Auth
    createdAt: timestamp("created_at").notNull().defaultNow(),
    // Better Auth extends how long user stays logged in
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    // better auth requires these two below
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    // links to user table
    userId: text("user_id")
        .notNull()
        // cascade basically deletes other related rows of user id
        .references(() => user.id, { onDelete: "cascade" }),
});

//  stores HOW someone is logged in or their method of credentials
export const account = pgTable("account", {
    // unique id for THIS login method
    id: text("id").primaryKey(),
    // same as the user's id for email/password
    accountId: text("account_id").notNull(),
    // what method was used to log in which in this case is credential (email+password)
    providerId: text("provider_id").notNull(),
    // which user this belongs to. connected to the user table as well
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    // the hashed password
    password: text("password"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// used for verify your emal or reset you password
export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    // usually the email this code is for
    // links the user to this verification table. better auth handles this
    identifier: text("identifier").notNull(),
    // the actual code/token sent in the link
    value: text("value").notNull(),
    // when that code stops working
    expiresAt: timestamp("expires_at").notNull(),
});