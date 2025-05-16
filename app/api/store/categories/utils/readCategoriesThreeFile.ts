import { CategoriesThree } from "@/types/productsType";
import fs from "node:fs";
import loadCategories from "./loadCategories";
import generateCategoriesThree from "./generateCategoriesThree";
import writeCategoriesThreeFile from "./writeCategoriesThreeFile";

export default async function readCategoriesThreeFile() {
    try {
        const json = fs.readFileSync("./categoriesThree.json", { encoding: "utf-8" });
        const data: CategoriesThree = JSON.parse(json);
        return data;
    } catch {
        const loadedCategories = await loadCategories();
        const categoriesThree = generateCategoriesThree(loadedCategories);
        writeCategoriesThreeFile(categoriesThree);

        return categoriesThree;
    }
}
