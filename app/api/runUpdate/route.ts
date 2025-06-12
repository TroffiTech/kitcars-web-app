import { update } from "@/scripts/updateContent";
import { NextResponse } from "next/server";
import { getQueries } from "../utils/readQueries";

export async function POST(req: Request) {
    const {password} = getQueries(req.url)  
    if (password === process.env.UPDATE_PASSWORD) 
    {
        try {
            console.log("Update started");
            await update();
            return NextResponse.json({ success: true });
        } catch {
            return NextResponse.json({ error: "Failed" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "unathorized" }, { status: 403 });
    }
}
