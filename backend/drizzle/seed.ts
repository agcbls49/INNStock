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
            category: "Mouse",
            totalStocks: 25,
            itemPrice: "999.00",
            status: "In Stock",
        },
        {
            productName: "Kingston 16GB DDR4 RAM",
            skuNumber: "SKU-002",
            category: "Memory",
            totalStocks: 12,
            itemPrice: "2780.00",
            status: "In Stock",
        },
        {
            productName: "Razer DeathAdder Essential",
            skuNumber: "SKU-003",
            category: "Mouse",
            totalStocks: 0,
            itemPrice: "3540.00",
            status: "Out of Stock",
        },
        {
            productName: "AMD Ryzen 5 5600",
            skuNumber: "SKU-004",
            category: "CPU",
            totalStocks: 15,
            itemPrice: "6999.00",
            status: "In Stock",
        },
        {
            productName: "Intel Core i5-12400F",
            skuNumber: "SKU-005",
            category: "CPU",
            totalStocks: 8,
            itemPrice: "8299.00",
            status: "In Stock",
        },
        {
            productName: "Cooler Master Hyper 212",
            skuNumber: "SKU-006",
            category: "CPU Cooler",
            totalStocks: 6,
            itemPrice: "2199.00",
            status: "Low Stock",
        },
        {
            productName: "MSI B550M PRO-VDH",
            skuNumber: "SKU-007",
            category: "Motherboard",
            totalStocks: 10,
            itemPrice: "5899.00",
            status: "In Stock",
        },
        {
            productName: "ASUS PRIME B660M-A",
            skuNumber: "SKU-008",
            category: "Motherboard",
            totalStocks: 4,
            itemPrice: "6999.00",
            status: "Low Stock",
        },
        {
            productName: "Kingston Fury 16GB DDR5",
            skuNumber: "SKU-009",
            category: "Memory",
            totalStocks: 20,
            itemPrice: "7780.00",
            status: "In Stock",
        },
        {
            productName: "Corsair Vengeance 32GB DDR4",
            skuNumber: "SKU-010",
            category: "Memory",
            totalStocks: 0,
            itemPrice: "5199.00",
            status: "Out of Stock",
        },
        {
            productName: "Samsung 980 1TB Gen4 NVMe SSD",
            skuNumber: "SKU-011",
            category: "Storage",
            totalStocks: 18,
            itemPrice: "6299.00",
            status: "In Stock",
        },
        {
            productName: "WD Blue 2TB HDD",
            skuNumber: "SKU-012",
            category: "Storage",
            totalStocks: 5,
            itemPrice: "3899.00",
            status: "Low Stock",
        },
        {
            productName: "AOC 24G2SP 24-inch",
            skuNumber: "SKU-013",
            category: "Monitor",
            totalStocks: 9,
            itemPrice: "8999.00",
            status: "In Stock",
        },
        {
            productName: "LG 24MP400-B",
            skuNumber: "SKU-014",
            category: "Monitor",
            totalStocks: 0,
            itemPrice: "6499.00",
            status: "Out of Stock",
        },
        {
            productName: "NVIDIA RTX 4060 8GB",
            skuNumber: "SKU-015",
            category: "GPU",
            totalStocks: 5,
            itemPrice: "18999.00",
            status: "Low Stock",
        },
        {
            productName: "AMD Radeon RX 7600 8GB",
            skuNumber: "SKU-016",
            category: "GPU",
            totalStocks: 7,
            itemPrice: "17999.00",
            status: "In Stock",
        },
        {
            productName: "NZXT H5 Flow",
            skuNumber: "SKU-017",
            category: "Case",
            totalStocks: 12,
            itemPrice: "5999.00",
            status: "In Stock",
        },
        {
            productName: "Montech Air 100",
            skuNumber: "SKU-018",
            category: "Case",
            totalStocks: 3,
            itemPrice: "3099.00",
            status: "Low Stock",
        },
        {
            productName: "Arctic P12 PWM",
            skuNumber: "SKU-019",
            category: "Case Fans",
            totalStocks: 25,
            itemPrice: "599.00",
            status: "In Stock",
        },
        {
            productName: "Cooler Master SickleFlow 120",
            skuNumber: "SKU-020",
            category: "Case Fans",
            totalStocks: 0,
            itemPrice: "799.00",
            status: "Out of Stock",
        },
        {
            productName: "Corsair CV650 650W",
            skuNumber: "SKU-021",
            category: "PSU",
            totalStocks: 8,
            itemPrice: "3299.00",
            status: "In Stock",
        },
        {
            productName: "FSP HV Pro 550W",
            skuNumber: "SKU-022",
            category: "PSU",
            totalStocks: 2,
            itemPrice: "2499.00",
            status: "Low Stock",
        },
        {
            productName: "TP-Link Archer T3U",
            skuNumber: "SKU-023",
            category: "Expansion Card",
            totalStocks: 14,
            itemPrice: "1299.00",
            status: "In Stock",
        },
        {
            productName: "Logitech C920 HD Pro",
            skuNumber: "SKU-024",
            category: "Webcam",
            totalStocks: 10,
            itemPrice: "3999.00",
            status: "In Stock",
        },
        {
            productName: "Logitech K120",
            skuNumber: "SKU-025",
            category: "Keyboard",
            totalStocks: 30,
            itemPrice: "599.00",
            status: "In Stock",
        },
        {
            productName: "Razer BlackWidow V3",
            skuNumber: "SKU-026",
            category: "Keyboard",
            totalStocks: 4,
            itemPrice: "5999.00",
            status: "Low Stock",
        },
        {
            productName: "Logitech G302",
            skuNumber: "SKU-027",
            category: "Mouse",
            totalStocks: 25,
            itemPrice: "1995.00",
            status: "In Stock",
        },
        {
            productName: "TP-Link TL-WN725N 802.11a USB Type-A Wi-Fi Adapter",
            skuNumber: "SKU-028",
            category: "Expansion Card",
            totalStocks: 0,
            itemPrice: "350.00",
            status: "Out of Stock",
        },
        {
            productName: "SteelSeries QcK Medium",
            skuNumber: "SKU-029",
            category: "Mouse Pad",
            totalStocks: 16,
            itemPrice: "899.00",
            status: "In Stock",
        },
        {
            productName: "HyperX Cloud II",
            skuNumber: "SKU-030",
            category: "Headset",
            totalStocks: 6,
            itemPrice: "3499.00",
            status: "Low Stock",
        }
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