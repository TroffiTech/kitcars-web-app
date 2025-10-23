import { Product } from "@/types/productsType";
import { promises as fs } from "fs";
import path from "path";

export async function readAllProductsFile(): Promise<Product[]> {
	try {
		const filePath = path.join(process.cwd(), "app/content", "allProducts.json");
		const fileContents = await fs.readFile(filePath, "utf8");
		const allProducts: Product[] = JSON.parse(fileContents);

		return allProducts.filter(
			(item: Product) =>
				item && typeof item === "object" && "status" in item && item.status === "publish"
		);
	} catch (error) {
		throw new Error("Function readAllProductsFile failed: " + error);
	}
}
