import { Product } from "@/types/productsType";
import { promises as fs } from "node:fs";

export default function writeAllProductsFile(allProductsArr: Product[]) {
    const data = JSON.stringify(allProductsArr);
    fs.writeFile(process.cwd() + "/app/content/allProducts.json", data, { encoding: "utf8" });
}
