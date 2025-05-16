import { CategoriesThree, Category } from "@/types/productsType";

export default function generateCategoriesThree(allLoadedCategoriesData: Category[]) {
    const categoriesList: Category[] = [];

    allLoadedCategoriesData.map((category: Category) => {
        categoriesList.push({
            name: category.name,
            slug: category.slug,
            id: category.id,
            parent: category.parent,
        });
    });

    const categoriesThree: CategoriesThree = [];

    categoriesList.map((category) => {
        if (category.parent === 0) categoriesThree.push({ ...category, childrens: [] });
    });

    categoriesList.map((categoryInList) => {
        categoriesThree.map((categoryInThree, index) => {
            if (categoryInThree.id === categoryInList.parent)
                categoriesThree[index].childrens?.push(categoryInList);
        });
    });

    return categoriesThree;
}
