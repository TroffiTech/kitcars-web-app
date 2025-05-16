import * as dotenv from "dotenv";
import generateCategoriesThree from "./utils/generateCategoriesThree.js";
import loadAllProducts from "./utils/loadAllProducts.js";
import loadCategories from "./utils/loadCategories.js";
import writeAllProductsFile from "./utils/writeAllProductsFile.js";
import writeCategoriesThreeFile from "./utils/writeCategoriesThreeFile.js";

dotenv.config();

export async function update() {
    console.info("update content");
    console.log("Task executed at:", new Date().toISOString());
    try {
        const loadedCategories = await loadCategories();
        const categoriesThree = generateCategoriesThree(loadedCategories);
        writeCategoriesThreeFile(categoriesThree);

        const allProductsLoaded = await loadAllProducts();
        writeAllProductsFile(allProductsLoaded);

        console.info("content loaded sucessfully");
    } catch (e) {
        console.error(e);
    }
}

update();
