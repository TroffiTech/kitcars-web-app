export default async function getCategories() {
    console.log("fetching all categories from WC API");

    const res = await fetch(
        `${process.env.storeUrl}/wp-json/wc/v3/products/categories?per_page=100`,
        {
            headers: {
                authorization: `Basic ${btoa(process.env.wcKey + ":" + process.env.wcSecret)}`,
                "content-type": "application/json",
            },
        }
    );
    return await res.json();
}
