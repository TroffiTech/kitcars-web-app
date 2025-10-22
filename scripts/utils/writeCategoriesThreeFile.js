import { promises as fs } from "node:fs";

export default function writeCategoriesThreeFile(categoriesThree) {
	const data = JSON.stringify(categoriesThree);
	fs.writeFile(process.cwd() + "/app/content/categoriesThree.json", data, { encoding: "utf8" });
	console.log("categories file are writed");
}
