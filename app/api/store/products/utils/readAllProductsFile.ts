import { Product } from "@/types/productsType";
import fs from "node:fs";
import loadAllProducts from "./loadAllProducts";
import writeAllProductsFile from "./writeAllProductsFile";

export async function readAllProductsFile() {
    try {
        const json = fs.readFileSync("./allProducts.json", { encoding: "utf8" });
        const data: Product[] = JSON.parse(json);

        return data.filter((item) => item.status === "publish");
    } catch {
        const allProductsLoaded = await loadAllProducts();
        writeAllProductsFile(allProductsLoaded);

        return allProductsLoaded.filter((item) => item.status === "publish");
    }
}
