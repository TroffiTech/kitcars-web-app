import { promises as fs } from "node:fs";

export default function writeCategoriesThreeFile(categoriesThree) {
    console.info("write categories three as .json");
    const data = JSON.stringify(categoriesThree);
    fs.writeFile(process.cwd() + "/app/content/categoriesThree.json", data, { encoding: "utf8" });
    console.info("categories file are writed");
}
