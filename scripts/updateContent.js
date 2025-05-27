import * as dotenv from "dotenv";
import generateCategoriesThree from "./utils/generateCategoriesThree.js";
import loadAllProducts from "./utils/loadAllProducts.js";
import loadCategories from "./utils/loadCategories.js";
import writeAllProductsFile from "./utils/writeAllProductsFile.js";
import writeCategoriesThreeFile from "./utils/writeCategoriesThreeFile.js";
import updateSitemap from "./utils/updateSitemap.js";
import writeSitemapFile from "./utils/writeSitemapFile.js";

dotenv.config();

export async function update() {
    console.log("Cron Task executed at:", new Date().toISOString());
    console.log("update .json content");
    try {
        const loadedCategories = await loadCategories();
        const categoriesThree = generateCategoriesThree(loadedCategories);
        writeCategoriesThreeFile(categoriesThree);

        const allProductsLoaded = await loadAllProducts();
        writeAllProductsFile(allProductsLoaded);
        console.log("content loaded sucessfully");

        console.log("updating sitemap");
        const xmlContent = await updateSitemap(allProductsLoaded);
        writeSitemapFile(xmlContent);
        console.log("sitemap writed");
    } catch (e) {
        console.error(e);
    }
}

update();
