import { CategoriesThree } from "@/types/productsType";
import { promises as fs } from "node:fs";

export default function writeCategoriesThreeFile(categoriesThree: CategoriesThree) {
    const data = JSON.stringify(categoriesThree);
    fs.writeFile(process.cwd() + "/app/content/categoriesThree.json", data, { encoding: "utf8" });
}
