"use client"

import { useEffect } from "react";

import ProductListCard from "../components/ProductListTable";

export default function ProductsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return(
        <div>
            <ProductListCard />
        </div>
    );
}