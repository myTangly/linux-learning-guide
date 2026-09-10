import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const errors = [];

function walk(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(folder, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const allFiles = walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const coursePages = htmlFiles.filter((file) => !file.includes(path.join("dist", "lab-files")));

for (const file of coursePages) {
  const html = fs.readFileSync(file, "utf8");
  const htmlWithoutCode = html.replace(/<pre>[\s\S]*?<\/pre>/g, "");
  const relative = path.relative(dist, file).replaceAll("\\", "/");

  if (!/<html lang="zh-CN">/.test(html)) errors.push(relative + ": 缺少 zh-CN");
  if (!/<meta charset="utf-8">/.test(html)) errors.push(relative + ": 缺少 UTF-8 声明");
  if (!/<main id="main"/.test(html)) errors.push(relative + ": 缺少主内容区");
  if (html.includes("~~~")) errors.push(relative + ": 残留未转换代码围栏");

  for (const match of htmlWithoutCode.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|data:|#)/i.test(target)) continue;
    const [targetPath, anchor] = target.split("#", 2);
    const resolved = path.resolve(path.dirname(file), targetPath);
    if (!fs.existsSync(resolved)) {
      errors.push(relative + ": 链接目标不存在 " + target);
      continue;
    }
    if (anchor && resolved.endsWith(".html")) {
      const targetHtml = fs.readFileSync(resolved, "utf8");
      if (!targetHtml.includes('id="' + anchor + '"')) errors.push(relative + ": 锚点不存在 " + target);
    }
  }

  for (const match of htmlWithoutCode.matchAll(/\bsrc="([^"]+)"/g)) {
    if (/^https?:/i.test(match[1])) errors.push(relative + ": 含远程运行资源 " + match[1]);
  }
}

const sensitivePatterns = [
  /Lenovo/iu,
  /唐铭阳/u,
  /C:\\Users\\/iu,
  /AAAProjectsCreate/iu,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  /(?:sk|pk)-[A-Za-z0-9_-]{20,}/u
];
for (const file of allFiles.filter((item) => fs.statSync(item).isFile())) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of sensitivePatterns) {
    if (pattern.test(content)) errors.push(path.relative(dist, file) + ": 命中隐私或凭据模式 " + pattern);
  }
}

const chapters = coursePages.filter((file) => /[\\/]docs[\\/]\d{2}-.*\.html$/.test(file));
if (coursePages.length !== 32) errors.push("教材页面数量应为 32，实际为 " + coursePages.length);
if (chapters.length !== 20) errors.push("章节数量应为 20，实际为 " + chapters.length);

for (const requiredFile of ["404.html", "robots.txt", "sitemap.xml"]) {
  if (!fs.existsSync(path.join(dist, requiredFile))) errors.push("缺少发布文件 " + requiredFile);
}

for (const file of coursePages) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('<link rel="canonical" href="https://linux.tangmy.top/')) {
    errors.push(path.relative(dist, file) + ": 缺少正式域名 canonical");
  }
}
for (const file of chapters) {
  const html = fs.readFileSync(file, "utf8");
  for (const heading of ["学习目标", "概念图", "实验", "预期", "故障分支", "自测", "官方来源"]) {
    if (!html.includes(heading)) errors.push(path.basename(file) + ": 缺少章节模块 " + heading);
  }
  const blockCount = (html.match(/class="code-block"/g) || []).length;
  const labelCount = (html.match(/class="code-label"/g) || []).length;
  if (blockCount !== labelCount) errors.push(path.basename(file) + ": 命令块标签数量不一致");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("html_validation=ok");
  console.log("course_pages=" + coursePages.length);
  console.log("chapter_pages=" + chapters.length);
  console.log("remote_runtime_assets=0");
  console.log("sensitive_pattern_hits=0");
}
