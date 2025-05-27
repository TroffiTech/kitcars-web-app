import * as dotenv from "dotenv";
import { XMLBuilder } from "fast-xml-parser";

dotenv.config();

export default async function updateSitemap(allProducts) {
    console.log("generating sitemap.xml file");

    const allUrls = [];
    allProducts.map((product) => {
        allUrls.push({
            loc: `${process.env.NEXT_PUBLIC_DOMEN}/catalog/product/${product.sku}`,
            priority: 0.9,
            lastmod: new Date().toISOString(),
            changefreq: "monthly",
        });
    });

    const urlBuilder = new XMLBuilder({
        arrayNodeName: "url",
    });
    const urlArray = urlBuilder.build(allUrls);

    const xmlContent = `<?xml version='1.0' encoding='UTF-8'?><urlset  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>${urlArray}</urlset>`;
    return xmlContent;
}
