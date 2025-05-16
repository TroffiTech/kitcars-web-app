"use client";

import useSWR from "swr";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "../../types/productsType";
import {
    CartProductCard,
    FeedProductCard,
    ProductCardSkeleton,
} from "../productCards/productCards";
import { RootState } from "@/store/store";
import CardReplacerFirstVariant, { CardReplacerSecondVariant } from "../productCards/replacerCards";
import Paginator from "./paginator/paginator";
import Search from "../search/Search";
import Selector from "./subCategoriesSelector/subCategorySelector";
import styles from "./productFeeds.module.scss";
import SortOrderSelector from "./sortSelector/sortSelector";
import { LinkButton } from "../ctaButtons/ctaButtons";

async function fetcher(url: string) {
    const res = await fetch(url);
    const totalPages = res.headers.get("x-total-count");
    return {
        data: (await res.json()) as Product[],
        totalPages: totalPages ? +totalPages : 0,
    };
}

function insertMockCardsInFeed(data: Array<"firstFlag" | "secondFlag" | Product>) {
    const firstMockCardposition = Math.floor(Math.random() * data.length);
    const secondMockCardposition = Math.floor(Math.random() * data.length);
    return data
        .toSpliced(firstMockCardposition, 0, "firstFlag")
        .toSpliced(secondMockCardposition, 0, "secondFlag");
}

export function CategoryFeed({ categorySlug }: { categorySlug: string }) {
    const [priceSortOrder, setPriceSortOrder] = useState("increase");
    const [curPage, setCurPage] = useState(1);

    const { data, isLoading } = useSWR(
        `/api/store/categories/getProductsInCategory/?page=${curPage}&category=${categorySlug}&order=${priceSortOrder}`,
        fetcher
    );

    return (
        <div className={styles.defaultFeed_container}>
            <div className={styles.topInner}>
                <div className={styles.searchBar}>
                    <Search />
                </div>
                <div className={styles.sortInputs}>
                    <Selector categorySlug={categorySlug} />
                    <SortOrderSelector
                        currentSortOrder={priceSortOrder}
                        sortOrderSetter={setPriceSortOrder}
                    />
                </div>
            </div>
            <div className={styles.defaultFeed}>
                {isLoading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <ProductCardSkeleton key={item} />
                    ))}
                {data &&
                    insertMockCardsInFeed(data.data).map((product, index) => {
                        if (product === "firstFlag")
                            return <CardReplacerFirstVariant key={index} />;
                        if (product === "secondFlag")
                            return <CardReplacerSecondVariant key={index} />;
                        return <FeedProductCard key={index} product={product} />;
                    })}
            </div>
            {data && (
                <Paginator
                    pagesStateSetter={setCurPage}
                    totalPages={data.totalPages}
                    curPage={curPage}
                />
            )}
        </div>
    );
}

export function SearchFeed({ searchRequest }: { searchRequest: string }) {
    const [curPage, setCurPage] = useState(1);

    const { data, isLoading } = useSWR(
        `/api/store/products/getSearchedProducts/?request=${searchRequest}&page=${curPage}`,
        fetcher
    );

    return (
        <div className={styles.defaultFeed_container}>
            <div className={styles.topInner}>
                <div className={styles.searchBar}>
                    <Search />
                </div>
            </div>
            <h2
                style={{
                    alignSelf: "start",
                    padding: "0 15px",
                }}>
                Результаты поиска: <br />
                &ldquo;{decodeURI(searchRequest)}&ldquo;
            </h2>
            <div className={styles.defaultFeed}>
                {isLoading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <ProductCardSkeleton key={item} />
                    ))}
                {data &&
                    insertMockCardsInFeed(data.data).map((product, index) => {
                        if (product === "firstFlag")
                            return <CardReplacerFirstVariant key={index} />;
                        if (product === "secondFlag")
                            return <CardReplacerSecondVariant key={index} />;
                        return <FeedProductCard key={index} product={product} />;
                    })}
            </div>
            {data && (
                <Paginator
                    pagesStateSetter={setCurPage}
                    totalPages={data.totalPages}
                    curPage={curPage}
                />
            )}
        </div>
    );
}

export function DefaultFeed() {
    const [curPage, setCurPage] = useState(1);
    const [priceSortOrder, setPriceSortOrder] = useState("increase");

    const { data, isLoading } = useSWR(
        `/api/store/products/getAllProducts/?page=${curPage}&order=${priceSortOrder}`,
        fetcher
    );

    return (
        <div className={styles.defaultFeed_container}>
            <div className={styles.topInner}>
                <div className={styles.searchBar}>
                    <Search />
                </div>
                <SortOrderSelector
                    currentSortOrder={priceSortOrder}
                    sortOrderSetter={setPriceSortOrder}
                />
            </div>
            <div className={styles.defaultFeed}>
                {isLoading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <ProductCardSkeleton key={item} />
                    ))}
                {data &&
                    insertMockCardsInFeed(data.data).map((product, index) => {
                        if (product === "firstFlag")
                            return <CardReplacerFirstVariant key={index} />;
                        if (product === "secondFlag")
                            return <CardReplacerSecondVariant key={index} />;
                        return <FeedProductCard key={index} product={product} />;
                    })}
            </div>
            {data && (
                <Paginator
                    pagesStateSetter={setCurPage}
                    totalPages={data.totalPages}
                    curPage={curPage}
                />
            )}
        </div>
    );
}

export function OnSaleFeed() {
    const { data, isLoading } = useSWR("/api/store/products/getOnSaleProducts", fetcher);

    return (
        <>
            {isLoading &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((item) => <ProductCardSkeleton key={item} />)}
            {data &&
                insertMockCardsInFeed(data.data).map((product, index) => {
                    if (product === "firstFlag") return <CardReplacerFirstVariant key={index} />;
                    if (product === "secondFlag") return <CardReplacerSecondVariant key={index} />;
                    return <FeedProductCard key={index} product={product} />;
                })}
        </>
    );
}

export function HitsFeed() {
    const { data, isLoading } = useSWR("/api/store/products/getNewestProducts", fetcher);
    return (
        <>
            {isLoading &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((item) => <ProductCardSkeleton key={item} />)}
            {data &&
                insertMockCardsInFeed(data.data).map((product, index) => {
                    if (product === "firstFlag") return <CardReplacerFirstVariant key={index} />;
                    if (product === "secondFlag") return <CardReplacerSecondVariant key={index} />;
                    return <FeedProductCard key={index} product={product} />;
                })}
        </>
    );
}

export function CartFeed() {
    const data = useSelector((state: RootState) => state.cart.value);
    let totalPrice = 0;
    data.map((elem) => {
        totalPrice += +elem.price * elem.quantity;
    });
    return (
        <div className={styles.cartFeed_container}>
            {data.length === 0 ? <h2>Корзина пуста</h2> : <h2>Корзина</h2>}
            {data.length !== 0 && (
                <div className={styles.feedContent}>
                    <div className={styles.cardsContainer}>
                        {data.map((product, index) => (
                            <CartProductCard key={product.id + index} product={product} />
                        ))}
                    </div>
                    <div className={styles.cartFeed_cta}>
                        <div className={styles.buttonContainer}>
                            <LinkButton text='Оформить заказ' link='/' />
                            <p>
                                Способ доставки и оплаты можно будет выбрать при оформлении заказа
                            </p>
                        </div>
                        <div className={styles.totalPrice}>
                            <p>Итого:</p>
                            <p>{totalPrice} руб.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
