import { writeFileSync } from "node:fs";

console.log("url:", url);

const response = await fetch(url);
const body = await response.json();
const formated = JSON.stringify(body, null, 2);
const file = "scripts/strapi-response.json";

writeFileSync(file, formated, "utf8");
