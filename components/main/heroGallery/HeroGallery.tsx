"use client";

import { useState } from "react";
import styles from "./HeroGallery.module.scss";
import { arrowLeftSVG, arrowRightSVG } from "@/components/shared/icons/icons";
import Search from "@/components/catalog/searchBar/Search";
import { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";

export default function HeroGallery() {
    const [currentSlide, setCurrentSlide] = useState(1);

    function moveSlide(direction: 1 | -1) {
        switch (direction) {
            case 1:
                setCurrentSlide((prev) => {
                    if (prev === 3) return 1;
                    else return prev + 1;
                });
                return;
            case -1:
                setCurrentSlide((prev) => {
                    if (prev === 1) return 3;
                    else return prev - 1;
                });
                return;
        }
    }

    return (
        <div className={styles.heroGallery}>
            <div
                className={styles.heroGallery_sliderContainer}
                style={{
                    transform: `translateX(${100 * (1 - currentSlide)}vw)`,
                }}>
                <FirstSlide />
                <SecondSlide />
                <ThirdSlide />
            </div>
            <button
                onClick={() => {
                    moveSlide(1);
                }}
                className={styles.heroGallery_buttonRight}>
                {arrowRightSVG}
            </button>
            <button
                onClick={() => {
                    moveSlide(-1);
                }}
                className={styles.heroGallery_buttonLeft}>
                {arrowLeftSVG}
            </button>

            <div className={styles.heroGallery_slideIndicatorContainer}>
                {[1, 2, 3].map((num) => (
                    <div
                        className={styles.heroGallery_slideIndicator}
                        key={num}
                        style={{
                            backgroundColor: `${
                                num === currentSlide
                                    ? "var(--orange-color)"
                                    : "var(--transparent-dark-color)"
                            }`,
                            borderColor: `${
                                num === currentSlide
                                    ? "var(--orange-color)"
                                    : "var(--background-color)"
                            }`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function FirstSlide() {
    return (
        <div className={styles.firstSlide}>
            <div className={styles.searchCont}>
                <Search />
            </div>
            <h1>УАЗ Патриот</h1>
            <div className={styles.textCont}>
                <p>Интернет-магазин деталей для тюнинга</p>
                <p>Работаем по Москве и московской области</p>
            </div>
            <div className={styles.buttonCont}>
                <LinkButton text={"Каталог деталей"} link={"/catalog"} />
            </div>
        </div>
    );
}

function SecondSlide() {
    return (
        <div className={styles.secondSlide}>
            <h2>Оформление переоборудования автомобилей</h2>
            <p>
                Оформляем документы на внесение изменений в конструкцию транспортного средства в
                ГИБДД под ключ
            </p>

            <div className={styles.buttonCont}>
                <LinkButton text='Подробнее' link='/registry' />
            </div>
        </div>
    );
}

function ThirdSlide() {
    return (
        <div className={styles.thirdSlide}>
            <h2>Оставайтесь на связи с нами</h2>
            <div className={styles.buttonCont}>
                <LinkButton text='Наш Телеграм' link='' />
            </div>
        </div>
    );
}
