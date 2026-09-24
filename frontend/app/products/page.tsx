"use client"

import { authClient } from "@/lib/auth-client";

import { useEffect } from "react";

import ActionsBar from "../components/ActionsBar";

export default function ProductsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return(
        <div>
            <ActionsBar />
        </div>
    );
}