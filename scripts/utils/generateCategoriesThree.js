export default function generateCategoriesTree(allLoadedCategoriesData) {
	console.info("generating categories tree object");

	// УБИРАЕМ фильтрацию по count, так как все категории имеют count: 0
	const categoriesMap = new Map();
	const tree = [];

	// Создаем все узлы без фильтрации по count
	allLoadedCategoriesData.forEach((category) => {
		categoriesMap.set(category.id, {
			name: category.name,
			slug: decodeURIComponent(category.slug),
			id: category.id,
			parent: category.parent,
			count: category.count,
			children: [],
		});
	});

	// Строим иерархию
	categoriesMap.forEach((category) => {
		if (category.parent === 0) {
			tree.push(category);
		} else {
			const parent = categoriesMap.get(category.parent);
			if (parent) {
				parent.children.push(category);
			} else {
				// Если родитель не найден, добавляем в корень
				console.warn(
					`Parent category ${category.parent} not found for ${category.name}, adding to root`
				);
				tree.push(category);
			}
		}
	});

	console.info("categories tree are built");
	return tree;
}
