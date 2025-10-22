import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import writeCategoriesThreeFile from "./utils/writeCategoriesThreeFile.js";
import generateCategoriesThree from "./utils/generateCategoriesThree.js";
import writeAllProductsFile from "./utils/writeAllProductsFile.js";
import writeRobotsTxtFile from "./utils/writeRobotsTxtFile.js";
import writeSitemapFile from "./utils/writeSitemapFile.js";
import loadAllProducts from "./utils/loadAllProducts.js";
import loadCategories from "./utils/loadCategories.js";
import updateSitemap from "./utils/updateSitemap.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

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
