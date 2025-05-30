import * as dotenv from "dotenv";
import { XMLBuilder } from "fast-xml-parser";

dotenv.config();

export default async function updateSitemap(allProducts) {
    console.log("generating sitemap.xml file");

    const categoriesXmls = `<url>
<loc>https://msk.uazpatr.ru/</loc>
<priority>1.0</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/sales</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/registry</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/contacts</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/delivery</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/catalog</loc>
<priority>0.9</priority>
</url>
<url>
<loc>
https://msk.uazpatr.ru/catalog/category/amortizatory
</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/catalog/category/lebedki</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/catalog/category/shnorkeli</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/catalog/category/pruzhiny</loc>
<priority>0.9</priority>
</url>
<url>
<loc>
https://msk.uazpatr.ru/catalog/category/reshyotki-radiatora
</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/offer</loc>
<priority>0.9</priority>
</url>
<url>
<loc>https://msk.uazpatr.ru/policy</loc>
<priority>0.9</priority>
</url>`;

    const productsUrls = [];
    allProducts.map((product) => {
        productsUrls.push({
            loc: `${process.env.NEXT_PUBLIC_DOMEN}/catalog/product/${product.sku}`,
            priority: 0.9,
            lastmod: new Date().toISOString(),
            changefreq: "monthly",
        });
    });

    const urlBuilder = new XMLBuilder({
        arrayNodeName: "url",
    });
    const productsXmls = urlBuilder.build(productsUrls);

    const xmlContent = `<?xml version='1.0' encoding='UTF-8'?><urlset  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>${categoriesXmls}${productsXmls}</urlset>`;
    return xmlContent;
}
