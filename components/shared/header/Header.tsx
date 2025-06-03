"use client";

import useSWR from "swr";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MenuPopup, MenuTrigger } from "./menu/Menu";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo";
import { checkIsMobile } from "@/lib/deviceTypeChecker";
import { infoLinks } from "./categoriesList";
import CallBackButton from "../ctaButtons/ctaButtons";
import { Category } from "@/types/productsType";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function fetcher(url: string) {
    const res = await fetch(url);
    return await res.json();
}

export default function Header() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    function setView() {
        if (checkIsMobile() || window.innerWidth <= 900) setIsMobile(true);
        else setIsMobile(false);
    }

    useEffect(() => {
        window.onresize = () => setView();
        return () => window.removeEventListener("resize", setView);
    });

    useEffect(() => {
        setView();
    });

    return (
        <header className={styles.header}>
            {isMobile && (
                <MobileHeader isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
            )}
            {!isMobile && <DesctopHeader />}
        </header>
    );
}

function DesctopHeader() {
    const pathname = usePathname();
    const { data } = useSWR("/api/store/categories/getCategoriesFile", fetcher);

    function generateLinkColor(category: Category) {
        const slugFromPathname = pathname.split("/")[3];

        if (category.slug.includes(slugFromPathname)) return "var(--orange-color)";

        if (category.childrens)
            for (const childrenCategory of category.childrens) {
                if (childrenCategory.slug === slugFromPathname) return "var(--orange-color)";
            }
        return "var(--background-color)";
    }

    return (
        <>
            <nav className={styles.header_topInner}>
                <Logo />
                <ul className={styles.header_infoLinks}>
                    {infoLinks.map((infoLink, index) => (
                        <li key={index}>
                            <Link href={infoLink.link}>{infoLink.name}</Link>
                        </li>
                    ))}
                </ul>
                {/* Contacts */}
                <div className={styles.header_topInner_contacts}>
                    <div>
                        <p>Мы работаем ежедневно</p>
                        <p>9:00 - 19:00, без выходных</p>
                    </div>
                </div>
                <CallBackButton text='Заказать звонок' />
            </nav>
            <nav className={styles.header_bottomInner}>
                <ul className={styles.header_categoryLinks}>
                    {data &&
                        data.map((category: Category, index: number) => (
                            <li key={index}>
                                <Link
                                    style={{
                                        color: generateLinkColor(category),
                                    }}
                                    href={`/catalog/category/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>
        </>
    );
}

function MobileHeader({
    isMenuVisible,
    setIsMenuVisible,
}: {
    isMenuVisible: boolean;
    setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <>
            <Logo />
            <MenuTrigger
                isVisible={isMenuVisible}
                stateDriver={() => {
                    setIsMenuVisible((prev) => !prev);
                }}
            />
            <MenuPopup isVisible={isMenuVisible} fetcher={fetcher} />
        </>
    );
}
