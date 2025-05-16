import { Product } from "@/types/productsType";
import fs from "node:fs";

export default function writeAllProductsFile(allProductsArr: Product[]) {
    const data = JSON.stringify(allProductsArr);
    fs.writeFileSync("./allProducts.json", data, { encoding: "utf8" });
}
