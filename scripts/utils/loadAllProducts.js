export default async function loadAllProducts() {
    console.info("loading products from WC API");
    const allProducts = [];

    const res = await fetch(`${process.env.DB_URL}/wp-json/wc/v3/products?per_page=10`, {
        headers: {
            authorization: `Basic ${btoa(process.env.WC_KEY + ":" + process.env.WC_SECRET)}`,
            "content-type": "application/json",
        },
    });
    const productsQuantity = Number(res.headers.get("x-wp-total"));
    const pagesQuantity = Math.ceil(productsQuantity / 100);

    for (let curPage = 1; curPage <= pagesQuantity; curPage++) {
        console.info(`loaded ${curPage} page from ${pagesQuantity}`);
        const res = await fetch(
            `${process.env.DB_URL}/wp-json/wc/v3/products?per_page=100&page=${curPage}`,
            {
                headers: {
                    authorization: `Basic ${btoa(
                        process.env.WC_KEY + ":" + process.env.WC_SECRET
                    )}`,
                    "content-type": "application/json",
                },
            }
        );

        const data = await res.json();
        allProducts.push(...data);
    }

    console.info("products list object are loaded");
    return allProducts;
}
