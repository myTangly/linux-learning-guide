import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const markdownFiles = [];

function collect(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    if (["dist", ".git"].includes(entry.name)) continue;
    const target = path.join(folder, entry.name);
    if (entry.isDirectory()) collect(target);
    else if (entry.name.endsWith(".md")) markdownFiles.push(target);
  }
}

collect(root);
const urls = new Set();
const siteHosts = new Set(["linux.tangmy.top", "mytangly.github.io"]);
for (const file of markdownFiles) {
  const markdown = fs.readFileSync(file, "utf8");
  for (const match of markdown.matchAll(/https:\/\/[^\s)><]+/g)) {
    const url = match[0].replace(/[.,;，。；]+$/u, "");
    if (!siteHosts.has(new URL(url).hostname)) urls.add(url);
  }
}

const failures = [];
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    let lastError = "unknown error";
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) });
        if ([403, 405].includes(response.status)) {
          response = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000) });
        }
        if (response.ok) {
          await response.body?.cancel();
          lastError = "";
          break;
        }
        await response.body?.cancel();
        lastError = "HTTP " + response.status;
      } catch (error) {
        lastError = error.message;
      }
    }
    if (lastError) failures.push(url + " -> " + lastError);
  }
}

console.log("checking_https_urls=" + urls.size);
await Promise.all(Array.from({ length: 12 }, worker));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("source_links=ok");
  console.log("unique_https_urls=" + urls.size);
}
