"use client";

import { useState } from "react";

import styles from "./SubCategoriesCarousel.module.scss";

import Link from "next/link";
import CallBackButton, { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";
import { arrowLeftSVG, arrowRightSVG } from "@/components/shared/icons/icons";

export default function SubcategoriesCarousel() {
    const [carouselPosition, setCarouselPosition] = useState(0);

    const cardLinks = [
        {
            slug: "amortizatory",
            name: "Аммортизаторы",
        },
        {
            slug: "lebedki",
            name: "Лебедки",
        },
        {
            slug: "shnorkeli",
            name: "Шноркели",
        },
        {
            slug: "pruzhiny",
            name: "Пружины",
        },
        {
            slug: "reshyotki-radiatora",
            name: "Решетки радиаторов",
        },
    ];

    return (
        <div className={styles.carousel}>
            <div
                className={styles.carousel_inner}
                style={{
                    transform: `translateX(${carouselPosition}px)`,
                }}>
                {cardLinks.map((link, index) => (
                    <Link
                        href={`catalog/category/${link.slug}`}
                        key={index}
                        className={styles.carousel_card}>
                        <h3>{link.name}</h3>
                    </Link>
                ))}
                <div className={styles.carousel_card}>
                    <h3>Больше товаров в каталоге</h3>
                    <LinkButton text='Каталог' link='/' />
                </div>
                <div className={styles.carousel_card}>
                    <p>Не нашли, что искали? Наш менеджер поможет Вам!</p>
                    <CallBackButton text='Перезвоните мне' />
                </div>
            </div>

            <button
                onClick={() => {
                    setCarouselPosition((prev) => {
                        if (prev === -370 * 3) return 0;
                        return prev - 370;
                    });
                }}
                className={styles.carousel_buttonRight}>
                {arrowRightSVG}
            </button>
            <button
                onClick={() => {
                    setCarouselPosition((prev) => {
                        if (prev === 0) return -370 * 3;
                        return prev + 370;
                    });
                }}
                className={styles.carousel_buttonLeft}>
                {arrowLeftSVG}
            </button>

            <div className={styles.carousel_slideIndicatorContainer}>
                {[0, -370, -370 * 2, -370 * 3].map((num) => (
                    <div
                        className={styles.carousel_slideIndicator}
                        key={num}
                        style={{
                            backgroundColor: `${
                                num === carouselPosition
                                    ? "var(--orange-color)"
                                    : "var(--transparent-dark-color)"
                            }`,
                            borderColor: `${
                                num === carouselPosition
                                    ? "var(--orange-color)"
                                    : "var(--foreground-color)"
                            }`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
