import postNewLead from "../bitrixApi/postNewLead";
import generateBitrixLeadFields from "../utils/generateBitrixLeadFields";

export async function POST(req: Request) {
    const { telValue } = await req.json();

    const leadFields = generateBitrixLeadFields(telValue);
    postNewLead(JSON.stringify(leadFields));

    return new Response(null, {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}
