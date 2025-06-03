"use state";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./sortSelector.module.scss";
import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

export default function SortOrderSelector({
    currentSortOrder,
    sortOrderSetter,
}: {
    currentSortOrder: string;
    sortOrderSetter: Dispatch<SetStateAction<string>>;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    function controlEscapePress(e: KeyboardEvent) {
        if (e.code !== "Escape") return;
        setIsExpanded(false);
    }

    function controlBodyClick(e: MouseEvent) {
        const button = (e.target as HTMLElement).closest("#sort_selector");
        if (button) {
            setIsExpanded((prev) => !prev);
        } else {
            setIsExpanded(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener("click", controlBodyClick);
        return () => document.body.removeEventListener("click", controlBodyClick);
    });

    useEffect(() => {
        document.body.addEventListener("keydown", controlEscapePress);
        return () => document.body.removeEventListener("keydown", controlEscapePress);
    });

    function handleSelect() {
        sortOrderSetter((prev) => {
            if (prev === "increase") return "decrease";
            else return "increase";
        });
    }

    return (
        <div
            id='sort_selector'
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
