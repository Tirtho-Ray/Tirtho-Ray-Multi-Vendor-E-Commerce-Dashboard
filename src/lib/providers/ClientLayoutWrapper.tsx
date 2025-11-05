"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [isPending,] = useTransition();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, [pathname]);

    const Spinner = (
        <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-400" />
        </div>
    );

    return (
        <div className="w-full h-full min-h-[calc(100vh-1.5rem)]">
            {loading || isPending ? (
                Spinner
            ) : (
                <Suspense fallback={Spinner}>
                    {children}
                </Suspense>
            )}
        </div>
    );
}
