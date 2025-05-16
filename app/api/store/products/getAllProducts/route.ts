import { getQueries } from "@/app/api/utils/readQueries";
import { readAllProductsFile } from "../utils/readAllProductsFile";

export async function GET(req: Request) {
    const queries = getQueries(req.url);
    const page: number = +queries.page;
    const sortOrder = queries.order;

    const data = (await readAllProductsFile()).sort((a, b) =>
        sortOrder === "increase" ? +a.price - +b.price : +b.price - +a.price
    );

    return new Response(JSON.stringify(data.slice(page * 10 - 10, page * 10)), {
        headers: {
            "content-type": "application/json",
        },
        statusText: `${Math.ceil(data.length / 10)}`,
        status: 200,
    });
}
