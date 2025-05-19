import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";

import styles from "./subCategorySelector.module.scss";
import { Category } from "@/types/productsType";
import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

async function fetcher(url: string) {
    const res = await fetch(url);
    return await res.json();
}

export default function SubCategorySelector({ categorySlug }: { categorySlug: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const { data } = useSWR(`/api/store/categories/getCategory?category=${categorySlug}`, fetcher);

    function hide(e: { type: string; code?: string }) {
        if (e.type === "click" || e.code === "Escape") setIsExpanded(false);
    }

    useEffect(() => {
        document.body.addEventListener("click", hide);
        return () => document.body.removeEventListener("click", hide);
    });

    useEffect(() => {
        document.body.addEventListener("keydown", hide);
        return () => document.body.removeEventListener("keydown", hide);
    });

    return (
        <div
            onClick={() => setIsExpanded((prev) => !prev)}
            style={{
                boxShadow: isExpanded ? "var(--box-shadow-variant)" : "var(--box-shadow)",
            }}
            className={styles.selector}>
            {data && <p>{data.name}</p>}
            <div
                style={{
                    transform: isExpanded ? "rotate(180deg)" : undefined,
                }}
                className={styles.icon}>
                {arrowDownMiniSVG}
            </div>
            <ul
                style={{
                    background: isExpanded ? "var(--background-color)" : "transparent",
                    color: isExpanded ? "var(--foreground-color)" : "foreground",
                    boxShadow: isExpanded ? undefined : "none",
                    visibility: isExpanded ? "visible" : "hidden",
                }}
                className={styles.expandedList}>
                {data &&
                    data.childrens.map((childrenCategory: Category, index: number) => (
                        <li key={index}>
                            <Link
                                className={styles.link}
                                href={`/catalog/category/${childrenCategory.slug}`}>
                                <p
                                    style={{
                                        color: isExpanded
                                            ? "var(--foreground-color)"
                                            : "foreground",
                                        visibility: isExpanded ? "visible" : "hidden",
                                    }}>
                                    {childrenCategory.name}
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
