import { readAllProductsFile } from "../utils/readAllProductsFile";

export async function GET() {
	const data = await readAllProductsFile();
	return new Response(JSON.stringify(data.slice(0, 10)), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
