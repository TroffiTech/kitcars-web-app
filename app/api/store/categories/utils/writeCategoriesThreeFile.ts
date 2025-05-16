import { CategoriesThree } from "@/types/productsType";
import fs from "node:fs";

export default function writeCategoriesThreeFile(categoriesThree: CategoriesThree) {
    const data = JSON.stringify(categoriesThree);
    fs.writeFileSync("./categoriesThree.json", data, { encoding: "utf8" });
}
