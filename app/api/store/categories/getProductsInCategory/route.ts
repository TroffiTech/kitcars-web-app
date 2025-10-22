import findRelatedCategoriesIdBySlug from "../utils/findRelatedCategoriesIdBySlug";
import { readAllProductsFile } from "../../products/utils/readAllProductsFile";
import readCategoriesThreeFile from "../utils/readCategoriesThreeFile";
import { getQueries } from "@/app/api/utils/readQueries";
import { Category, Product } from "@/types/productsType";

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const { category, page, order } = queries;

	const categoriesThree = await readCategoriesThreeFile();
	const allProducts = (await readAllProductsFile()).sort((a, b) =>
		order === "increase" ? +a.price - +b.price : +b.price - +a.price
	);

	const relatedCategoriesId = findRelatedCategoriesIdBySlug(
		categoriesThree,
		decodeURIComponent(category)
	);

	const data: Product[] = [];

	relatedCategoriesId.map((categoryId: number) => {
		allProducts.map((product) => {
			product.categories.map((categoryOfProduct: Category) => {
				if (categoryId == categoryOfProduct.id) data.push(product);
			});
		});
	});

	return new Response(JSON.stringify(data.slice(+page * 12 - 12, +page * 12)), {
		headers: {
			"content-type": "application/json",
			"x-total-count": `${Math.ceil(data.length / 12)}`,
		},
		status: 200,
	});
}
