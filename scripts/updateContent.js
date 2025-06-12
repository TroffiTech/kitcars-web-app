import * as dotenv from "dotenv";
import generateCategoriesThree from "./utils/generateCategoriesThree.js";
import loadAllProducts from "./utils/loadAllProducts.js";
import loadCategories from "./utils/loadCategories.js";
import writeAllProductsFile from "./utils/writeAllProductsFile.js";
import writeCategoriesThreeFile from "./utils/writeCategoriesThreeFile.js";
import updateSitemap from "./utils/updateSitemap.js";
import writeSitemapFile from "./utils/writeSitemapFile.js";
import writeRobotsTxtFile from "./utils/writeRobotsTxtFile.js";

dotenv.config();

export async function update() {
    try {
        const loadedCategories = await loadCategories();
        const categoriesThree = generateCategoriesThree(loadedCategories);
        writeCategoriesThreeFile(categoriesThree);

        const allProductsLoaded = await loadAllProducts();
        writeAllProductsFile(allProductsLoaded);

        const xmlContent = await updateSitemap(allProductsLoaded);
        writeSitemapFile(xmlContent);

        writeRobotsTxtFile();
    } catch (e) {
        console.error(e);
    }
}

update();
