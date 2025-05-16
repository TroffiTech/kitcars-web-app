"use client";

import { useContext, useEffect } from "react";
import styles from "./modalDescription.module.scss";
import { ModalDescriptionContext } from "@/hooks/modalDescriptionProvider";
import { arrowRightSVG } from "../icons/icons";
import ImageCarousel from "../imageCarousel/imageCarusel";
import { AddToCartButton } from "../cartButtons/cartButtons";

export default function ModalDescription() {
    const isVisible = useContext(ModalDescriptionContext).isVisible;
    const setIsVisible = useContext(ModalDescriptionContext)?.setIsVisible;
    const productData = useContext(ModalDescriptionContext)?.productData;

    function generateDescription(hmtlText: string) {
        const description = { __html: hmtlText };
        return <div dangerouslySetInnerHTML={description} />;
    }

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add("blockScroll");
        } else {
            document.body.classList.remove("blockScroll");
        }
    });

    if (!productData) return;

    return (
        <div
            className={styles.modal}
            style={{
                right: `${isVisible ? "0" : "-100vw"}`,
            }}>
            <div className={styles.innerContent}>
                <div className={styles.upperInner}>
                    <button
                        className={styles.closeButton}
                        onClick={setIsVisible ? () => setIsVisible(false) : () => {}}>
                        {arrowRightSVG}
                    </button>

                    <a
                        href={`${process.env.domenUrl}/catalog/product/${productData.sku}`}
                        className={
                            styles.productLink
                        }>{`${process.env.domenUrl}/catalog/product/${productData.sku}`}</a>
                    <ImageCarousel images={productData.images} />
                </div>
                <div className={styles.lowerInner}>
                    <div className={styles.categoriesString}>
                        {productData.categories.map((category) => (
                            <p key={category.id}>&gt;{category.name + " "}</p>
                        ))}
                    </div>

                    <h2>{productData.name}</h2>
                    <p className={styles.sku}>Арт. : {productData.sku}</p>

                    <div className={styles.priceBlock}>
                        {productData.sale_price ? (
                            <>
                                <p className={styles.sale}>{productData.sale_price}</p>
                                <p className={styles.regular}>
                                    <span>{productData.regular_price}</span> руб.
                                </p>
                            </>
                        ) : (
                            <p>{productData.regular_price} руб.</p>
                        )}
                    </div>

                    <div className={styles.addToCartButton}>
                        <AddToCartButton productData={productData} />
                    </div>

                    <h3>О товаре</h3>
                    <div className={styles.generatedDescription}>
                        {generateDescription(productData.description)}
                    </div>
                </div>
            </div>
        </div>
    );
}
