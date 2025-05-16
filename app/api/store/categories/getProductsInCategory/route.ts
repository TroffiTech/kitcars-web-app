import { getQueries } from "@/app/api/utils/readQueries";
import findRelatedCategoriesIdBySlug from "../utils/findRelatedCategoriesIdBySlug";
import readCategoriesThreeFile from "../utils/readCategoriesThreeFile";
import { readAllProductsFile } from "../../products/utils/readAllProductsFile";
import { Product } from "@/types/productsType";

export async function GET(req: Request) {
    const queries = getQueries(req.url);
    const { category, page, order } = queries;

    const categoriesThree = await readCategoriesThreeFile();
    const allProducts = (await readAllProductsFile()).sort((a, b) =>
        order === "increase" ? +a.price - +b.price : +b.price - +a.price
    );

    const relatedCategoriesId = findRelatedCategoriesIdBySlug(categoriesThree, category);

    const data: Product[] = [];

    relatedCategoriesId.map((categoryId) => {
        allProducts.map((product) => {
            product.categories.map((categoryOfProduct) => {
                if (categoryId === +categoryOfProduct.id) data.push(product);
            });
        });
    });

    return new Response(JSON.stringify(data.slice(+page * 10 - 10, +page * 10)), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
        statusText: `${Math.ceil(data.length / 10)}`,
    });
}
