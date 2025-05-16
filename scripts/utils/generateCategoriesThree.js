export default function generateCategoriesThree(allLoadedCategoriesData) {
    console.info("generating categories three object");
    const categoriesList = [];

    allLoadedCategoriesData.map((category) => {
        categoriesList.push({
            name: category.name,
            slug: category.slug,
            id: category.id,
            parent: category.parent,
        });
    });

    const categoriesThree = [];

    categoriesList.map((category) => {
        if (category.parent === 0) categoriesThree.push({ ...category, childrens: [] });
    });

    categoriesList.map((categoryInList) => {
        categoriesThree.map((categoryInThree, index) => {
            if (categoryInThree.id === categoryInList.parent)
                categoriesThree[index].childrens?.push(categoryInList);
        });
    });

    console.info("categories three are builded");
    return categoriesThree;
}
