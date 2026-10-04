"use client"

import { useEffect } from "react";

import ActionsBar from "../components/ActionsBar";
import ProductListCard from "../components/ProductListTable";

export default function ProductsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return(
        <div>
            <ActionsBar />
            <ProductListCard />
        </div>
    );
}