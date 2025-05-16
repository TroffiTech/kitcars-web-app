import { getQueries } from "@/app/api/utils/readQueries";
import readCategoriesThreeFile from "../utils/readCategoriesThreeFile";

export async function GET(req: Request) {
    const { category } = getQueries(req.url);
    const categoriesThree = await readCategoriesThreeFile();

    let objToReturn;

    categoriesThree.map((parentCategory) => {
        if (parentCategory.slug === category) objToReturn = { ...parentCategory };
        else {
            parentCategory.childrens?.map((childrenCategory) => {
                if (childrenCategory.slug === category) objToReturn = { ...parentCategory };
            });
        }
    });

    return new Response(JSON.stringify(objToReturn), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}
