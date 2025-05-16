import { Product } from "@/types/productsType";

export default async function loadAllProducts() {
    const allProducts = [];

    const res = await fetch(`${process.env.storeUrl}/wp-json/wc/v3/products?per_page=10`, {
        headers: {
            authorization: `Basic ${btoa(process.env.wcKey + ":" + process.env.wcSecret)}`,
            "content-type": "application/json",
        },
    });
    const productsQuantity = Number(res.headers.get("x-wp-total"));
    const pagesQuantity = Math.ceil(productsQuantity / 100);

    for (let curPage = 1; curPage <= pagesQuantity; curPage++) {
        const res = await fetch(
            `${process.env.storeUrl}/wp-json/wc/v3/products?per_page=100&page=${curPage}`,
            {
                headers: {
                    authorization: `Basic ${btoa(process.env.wcKey + ":" + process.env.wcSecret)}`,
                    "content-type": "application/json",
                },
            }
        );

        const data: Product[] = await res.json();
        allProducts.push(...data);
    }

    return allProducts;
}
