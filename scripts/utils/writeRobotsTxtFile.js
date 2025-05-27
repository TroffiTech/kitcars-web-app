import { promises as fs } from "node:fs";

export default function writeRobotsTxtFile() {
    const content = `User-agent: *
Allow: /*
Allow: /catalog/product/*
Disallow: /checkout/
Disallow: /catalog/search/
Sitemap: ${process.env.NEXT_PUBLIC_DOMEN}/sitemap.xml`;

    fs.writeFile(process.cwd() + "/app/robots.txt", content, { encoding: "utf8" });
    console.log("robots.txt are writed");
}
