import { useEffect } from "react";
import useSWR from "swr";
import styles from "./Menu.module.css";
import { infoLinks } from "../categoriesList";
import { CategoriesThree } from "@/types/productsType";
import CallBackButton from "../../ctaButtons/ctaButtons";
import Link from "next/link";

export function MenuPopup({
    isVisible,
    fetcher,
}: {
    isVisible: boolean;
    fetcher: (url: string) => Promise<CategoriesThree>;
}) {
    const { data } = useSWR("/api/store/categories/getCategoriesFile", fetcher);

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add("blockScroll");
        } else {
            document.body.classList.remove("blockScroll");
        }
    });

    return (
        <menu
            className={styles.menuPopup}
            style={{
                left: `${isVisible ? "0" : "-100vw"}`,
            }}>
            <div className={styles.menuPopup_innerContent}>
                {/* Categories Links */}
                <ul className={styles.menuPopup_innerContent_categories}>
                    {data &&
                        data.map((category, index) => (
                            <li key={index}>
                                <Link href={`/catalog/category/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                </ul>

                {/* Info Links */}
                <ul className={styles.menuPopup_innerContent_infoLinks}>
                    {infoLinks.map((category, index) => (
                        <li key={index}>
                            <Link href={category.link}>{category.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* Contacts */}
                <div className={styles.menuPopup_innerContent_contacts}>
                    <div>
                        <p>Мы работаем ежедневно</p>
                        <p>9:00 - 19:00, без выходных</p>
                    </div>
                    <Link
                        className={styles.menuPopup_innerContent_contacts_phoneNumber}
                        href='tel:+7 (800) 555 35 35'>
                        8 (800) 555 35 35
                    </Link>
                    <CallBackButton text='Заказать звонок' />
                </div>
            </div>
        </menu>
    );
}

export function MenuTrigger({
    isVisible,
    stateDriver,
}: {
    isVisible: boolean;
    stateDriver: () => void;
}) {
    return (
        <div onClick={stateDriver} className={styles.triggerButton}>
            <ul className={styles.triggerButton_container}>
                {[1, 2, 3].map((num) => (
                    <li
                        key={num}
                        className={
                            isVisible
                                ? styles.triggerButton_container_item__pressed
                                : styles.triggerButton_container_item
                        }
                    />
                ))}
            </ul>
        </div>
    );
}
