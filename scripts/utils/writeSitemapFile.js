import { promises as fs } from "node:fs";

export default function writeSitemapFile(xmlContent) {
    fs.writeFile(process.cwd() + "/app/sitemap.xml", xmlContent, { encoding: "utf8" });
    console.log("sitemap are writed");
}
