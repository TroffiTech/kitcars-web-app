import { arrowDownMiniSVG } from "@/components/shared/icons/icons";
import styles from "./filters.module.scss";
import { Category } from "@/types/productsType";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

async function fetcher(url: string) {
    const res = await fetch(url);
    return await res.json();
}

export default function Filters() {
    const { data } = useSWR("/api/store/categories/getCategoriesFile", fetcher);

    return (
        <ul className={styles.filters}>
            {data &&
                data.map((parentCategory: Category) => (
                    <li className={styles.parentCategory} key={parentCategory.id}>
                        <ChildrenCategory parentCategory={parentCategory} />
                    </li>
                ))}
        </ul>
    );
}

function ChildrenCategory({ parentCategory }: { parentCategory: Category }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div onClick={() => setIsExpanded((prev) => !prev)} className={styles.title}>
                <Link className={styles.link} href={`/catalog/category/${parentCategory.slug}`}>
                    {parentCategory.name}
                </Link>
                <div
                    style={{
                        height: "fit-content",
                        width: "fit-content",
                        background: "transparent",
                        transform: `${isExpanded ? "rotateX(180deg)" : "rotateX(0)"}`,
                        transition: "all 0.2s linear",
                    }}>
                    {parentCategory.childrens?.length !== 0 && arrowDownMiniSVG}
                </div>
            </div>
            <ul
                className={styles.childrens}
                style={{
                    maxHeight: `${isExpanded ? "600px" : "0"}`,
                }}>
                {parentCategory.childrens?.map((childrenCategory: Category) => (
                    <li key={childrenCategory.id}>
                        <Link
                            className={styles.link}
                            href={`/catalog/category/${childrenCategory.slug}`}>
                            {childrenCategory.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
