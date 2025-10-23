import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
	const authHeader = request.headers.get("authorization");

	if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	revalidatePath("/catalog");
	revalidatePath("/");
	revalidatePath("/api/products");

	return NextResponse.json({ revalidated: true });
}
