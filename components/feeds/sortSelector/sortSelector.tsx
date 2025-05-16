"use state";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./sortSelector.module.scss";
import { arrowDownMiniSVG } from "@/components/icons/icons";

export default function SortOrderSelector({
    currentSortOrder,
    sortOrderSetter,
}: {
    currentSortOrder: string;
    sortOrderSetter: Dispatch<SetStateAction<string>>;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

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

    function handleSelect() {
        sortOrderSetter((prev) => {
            if (prev === "increase") return "decrease";
            else return "increase";
        });
    }

    return (
        <div
            onClick={() => setIsExpanded((prev) => !prev)}
            style={{
                boxShadow: isExpanded ? "var(--box-shadow-variant)" : "var(--box-shadow)",
            }}
            className={styles.sortOrderSelector}>
            <p>{currentSortOrder === "increase" ? "Сначала дешевле" : "Сначала дороже"}</p>
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
                <li onClick={handleSelect}>
                    {currentSortOrder === "increase" ? "Сначала дороже" : "Сначала дешевле"}
                </li>
            </ul>
        </div>
    );
}
