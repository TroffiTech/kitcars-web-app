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

dotenv.config({ path: "/app/.env" });

async function update() {
	try {
		console.log("Starting content update...", new Date().toISOString());

		const loadedCategories = await loadCategories();
		const categoriesThree = generateCategoriesThree(loadedCategories);
		writeCategoriesThreeFile(categoriesThree);

		const allProductsLoaded = await loadAllProducts();
		writeAllProductsFile(allProductsLoaded);

		const xmlContent = await updateSitemap(allProductsLoaded);
		writeSitemapFile(xmlContent);

		writeRobotsTxtFile();

		console.log("Content update completed successfully", new Date().toISOString());

		try {
			const response = await fetch("http://nextjs-app:3000/api/health", { timeout: 5000 });
			if (response.ok) {
				// Вызываем revalidate только если nextjs-app доступен
				await fetch("http://nextjs-app:3000/api/revalidate", {
					method: "POST",
					headers: { Authorization: `Bearer ${process.env.REVALIDATE_SECRET}` },
				});
			}
		} catch (error) {
			console.log("Next.js app not available for revalidation, skipping...");
		}
	} catch (e) {
		console.error("Error during content update:", e);
		process.exit(1);
	}
}

// Запуск если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
	update();
}

export default update;
