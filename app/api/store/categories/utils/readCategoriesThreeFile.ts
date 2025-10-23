import { CategoriesThree } from "@/types/productsType";
import { promises as fs } from "fs";
import path from "path";

export default async function readCategoriesThreeFile() {
	try {
		// Динамически читаем файл каждый раз
		const filePath = path.join(process.cwd(), "app/content", "categoriesThree.json");
		const fileContents = await fs.readFile(filePath, "utf8");
		const categoriesThree: CategoriesThree = JSON.parse(fileContents);

		return categoriesThree;
	} catch {
		console.error("Error while reading categoriesThree.json");
	}
}
