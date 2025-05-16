import categoriesThree from "@/app/content/categoriesThree.json";
import loadCategories from "../../../../../scripts/utils/loadCategories";
import generateCategoriesThree from "../../../../../scripts/utils/generateCategoriesThree";
import writeCategoriesThreeFile from "../../../../../scripts/utils/writeCategoriesThreeFile";

export default async function readCategoriesThreeFile() {
    if (categoriesThree) return categoriesThree;
    else {
        const loadedCategories = await loadCategories();
        const loadedCategoriesThree = generateCategoriesThree(loadedCategories);
        writeCategoriesThreeFile(loadedCategoriesThree);
        return loadedCategoriesThree;
    }
}
