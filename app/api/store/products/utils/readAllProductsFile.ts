import loadAllProducts from "../../../../../scripts/utils/loadAllProducts";
import writeAllProductsFile from "../../../../../scripts/utils/writeAllProductsFile";
import allProducts from "@/app/content/allProducts.json";

export async function readAllProductsFile() {
	if (allProducts)
		return (allProducts as Array<unknown>).filter(
			(item) =>
				item instanceof Object && "status" in item && item.status === "publish"
		);
	else {
		const allProductsLoaded = await loadAllProducts();
		writeAllProductsFile(allProductsLoaded);

		return allProductsLoaded.filter((item) => item.status === "publish");
	}
}
