"use client";

import { useState } from "react";
import styles from "./Tabs.module.scss";
import { HitsFeed, OnSaleFeed } from "@/components/catalog/feeds/productsFeeds";

export default function Tabs() {
    const [tab, setTab] = useState<"Выгодно" | "Новинки">("Выгодно");

    return (
        <div className={styles.tabs}>
            <div className={styles.tabs_head}>
                <div
                    onClick={() => setTab("Выгодно")}
                    className={
                        tab === "Выгодно"
                            ? styles.tabs_head_selector_selected
                            : styles.tabs_head_selector
                    }>
                    Скидки
                </div>
                <div
                    onClick={() => setTab("Новинки")}
                    className={
                        tab === "Новинки"
                            ? styles.tabs_head_selector_selected
                            : styles.tabs_head_selector
                    }>
                    Новинки
                </div>
            </div>
            <div className={styles.tabs_feed}>
                {tab === "Выгодно" && <OnSaleFeed />}
                {tab === "Новинки" && <HitsFeed />}
            </div>
        </div>
    );
}
