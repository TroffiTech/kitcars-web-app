import { promises as fs } from "node:fs";

export default function writeSitemapFile(xmlContent) {
    console.info("writing sitemap");
    fs.writeFile(process.cwd() + "/app/sitemap.xml", xmlContent, { encoding: "utf8" });
}
