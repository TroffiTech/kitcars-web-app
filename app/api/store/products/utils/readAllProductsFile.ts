import { Product } from "@/types/productsType";
import { promises as fs } from "node:fs";
import loadAllProducts from "./loadAllProducts";
import writeAllProductsFile from "./writeAllProductsFile";

export async function readAllProductsFile() {
    try {
        const json = await fs.readFile(process.cwd() + "/app/content/allProducts.json", {
            encoding: "utf8",
        });
        const data: Product[] = JSON.parse(json);

        return data.filter((item) => item.status === "publish");
    } catch {
        const allProductsLoaded = await loadAllProducts();
        writeAllProductsFile(allProductsLoaded);

        return allProductsLoaded.filter((item) => item.status === "publish");
    }
}
