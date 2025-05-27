import { promises as fs } from "node:fs";

export default function writeAllProductsFile(allProductsArr) {
    console.info("write products list object as .json");
    const data = JSON.stringify(allProductsArr);
    fs.writeFile(process.cwd() + "/app/content/allProducts.json", data, { encoding: "utf8" });
    console.log("all produts file are writed");
}
