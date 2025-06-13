import { update } from "@/scripts/updateContent";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		console.log(`scheduled task executed at ${new Date().toISOString()}`);
		await update();
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Failed" }, { status: 500 });
	}
}
