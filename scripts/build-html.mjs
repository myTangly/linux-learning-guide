import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const checkedDate = "2026-09-10";
const siteBase = "https://linux.tangmy.top";
const siteDescription = "面向 Windows 11 新手的 Linux、WSL 2、Ubuntu、Docker Desktop 与 Codex 中文联合教程。";

const chapters = fs.readdirSync(path.join(root, "docs"))
  .filter((name) => /^\d{2}-.*\.md$/.test(name))
  .sort();

const references = [
  ["course-map.md", "学习地图"],
  ["cheatsheet.md", "命令速查"],
  ["glossary.md", "术语表"],
  ["troubleshooting.md", "故障索引"],
  ["answers.md", "自测答案"],
  ["sources.md", "来源台账"],
  ["validation.md", "验证报告"],
  ["operations.md", "操作记录"]
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[：:，,。！？!?、“”"'（）()【】\[\]]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function rewriteHref(href) {
  const parts = href.split("#");
  let file = parts[0];
  const anchor = parts.length > 1 ? "#" + parts.slice(1).join("#") : "";
  if (/README\.md$/i.test(file)) {
    file = file.replace(/README\.md$/i, "index.html");
  } else if (/\.md$/i.test(file)) {
    file = file.replace(/\.md$/i, ".html");
  }
  return file + anchor;
}

function inline(value) {
  let output = value;
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = rewriteHref(href);
    const external = /^https?:\/\//i.test(safeHref);
    return '<a href="' + safeHref + '"' +
      (external ? ' target="_blank" rel="noreferrer noopener"' : "") +
      ">" + label + "</a>";
  });
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/`([^`]+)`/g, (_match, code) => "<code>" + escapeHtml(code) + "</code>");
  output = output.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" target="_blank" rel="noreferrer noopener">$1</a>');
  output = output.replace(/<(https?:\/\/[^>]+)>/g, '<a href="$1" target="_blank" rel="noreferrer noopener">$1</a>');
  return output;
}

function renderTable(lines) {
  const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((v) => v.trim());
  const header = cells(lines[0]);
  const rows = lines.slice(2).map(cells);
  return '<div class="table-wrap"><table><thead><tr>' +
    header.map((cell) => "<th>" + inline(cell) + "</th>").join("") +
    "</tr></thead><tbody>" +
    rows.map((row) => "<tr>" + row.map((cell) => "<td>" + inline(cell) + "</td>").join("") + "</tr>").join("") +
    "</tbody></table></div>";
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let paragraph = [];
  let listType = "";
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push("<p>" + inline(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length) {
      out.push("<" + listType + ">" + listItems.map((item) => "<li>" + inline(item) + "</li>").join("") + "</" + listType + ">");
      listItems = [];
      listType = "";
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const fence = line.match(/^~~~([\w-]*)\s*$/);
    if (fence) {
      flushParagraph();
      flushList();
      const language = fence[1] || "text";
      const environmentLabels = {
        powershell: "PowerShell",
        bash: "Ubuntu Bash",
        codex: "Codex 输入框",
        text: "概念图 / 文本",
        dockerfile: "项目文件 · Dockerfile",
        yaml: "项目文件 · YAML",
        gitignore: "项目文件 · .gitignore",
        html: "项目文件 · HTML",
        css: "项目文件 · CSS"
      };
      const code = [];
      i += 1;
      while (i < lines.length && !/^~~~\s*$/.test(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      out.push('<div class="code-block"><div class="code-label">' + escapeHtml(environmentLabels[language] || language) +
        '</div><pre><code>' + escapeHtml(code.join("\n")) + "</code></pre></div>");
      continue;
    }

    if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|?\s*:?-+/.test(lines[i + 1])) {
      flushParagraph();
      flushList();
      const tableLines = [line, lines[i + 1]];
      i += 2;
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        tableLines.push(lines[i]);
        i += 1;
      }
      i -= 1;
      out.push(renderTable(tableLines));
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = inline(heading[2]);
      out.push("<h" + level + ' id="' + slugify(heading[2]) + '">' + text + "</h" + level + ">");
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      out.push("<blockquote>" + inline(quote[1]) + "</blockquote>");
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? "ul" : "ol";
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered || ordered)[1]);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      out.push("<hr>");
      continue;
    }

    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  return out.join("\n");
}

function titleFromMarkdown(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : "Linux 联合教程";
}

function depthPrefix(outputRelative) {
  const depth = outputRelative.split("/").length - 1;
  return "../".repeat(depth);
}

function navHtml(prefix, active) {
  const chapterLinks = chapters.map((name) => {
    const target = "docs/" + name.replace(/\.md$/, ".html");
    const title = titleFromMarkdown(fs.readFileSync(path.join(root, "docs", name), "utf8")).replace(/^第\s*/, "");
    return '<a class="nav-link' + (active === target ? " active" : "") + '" href="' + prefix + target + '">' + title + "</a>";
  }).join("");
  const referenceLinks = references.map(([name, label]) => {
    const target = "docs/" + name.replace(/\.md$/, ".html");
    return '<a class="nav-link' + (active === target ? " active" : "") + '" href="' + prefix + target + '">' + label + "</a>";
  }).join("");
  const labTarget = "labs/notes-site/index.html";
  const labLink = '<a class="nav-link' + (active === labTarget ? " active" : "") + '" href="' + prefix + labTarget + '">综合实验</a>';
  return '<aside class="sidebar" id="sidebar">' +
    '<a class="brand" href="' + prefix + 'index.html"><span class="brand-mark">&gt;_</span><span>Learning Linux</span></a>' +
    '<label class="nav-search"><span class="sr-only">筛选章节</span><input id="navFilter" type="search" placeholder="筛选章节…" autocomplete="off"></label>' +
    '<nav aria-label="教程章节"><p class="nav-heading">20 章课程</p><div id="chapterNav">' + chapterLinks +
    '</div><p class="nav-heading">参考资料</p><div>' + referenceLinks + labLink + "</div></nav>" +
    '<div class="sidebar-note"><strong>仅作文件指导</strong><span>页面不会执行任何命令或修改系统。</span></div>' +
    "</aside>";
}

function statePanel() {
  const states = [
    ["Windows", "11 家庭版 · Build 26100", "已核验"],
    ["WSL", "2.7.13 · Ubuntu 使用 WSL 2", "已核验"],
    ["Ubuntu", "26.04.1 LTS", "已核验"],
    ["Docker", "Desktop 4.89.0 · Engine 29.7.2", "已核验"],
    ["Compose", "5.5.0", "已核验"],
    ["Codex", "桌面版 26.903.8094.0", "已核验"],
    ["Codex CLI", "Ubuntu 内未安装", "仅提供指导"],
    ["Node.js", "Ubuntu 内未安装", "不作为前提"]
  ];
  return '<section class="state-panel" aria-labelledby="state-title"><div class="section-kicker">CURRENT BASELINE</div>' +
    '<h2 id="state-title">与你当前电脑一致的学习路线</h2><p>以下仅记录软件状态，不包含用户名、设备序列号、账号或路径等个人资料。</p>' +
    '<div class="state-grid">' + states.map(([name, value, status]) =>
      '<div class="state-item"><div><span>' + name + '</span><strong>' + value + '</strong></div><em>' + status + "</em></div>"
    ).join("") + '</div><div class="route-callout"><strong>固定路线</strong><span>Windows Home → WSL 2 → Ubuntu → Docker Linux containers → Codex 桌面版；CLI 仅为可选指导。</span></div></section>';
}

function chapterPager(outputRelative) {
  if (!outputRelative.startsWith("docs/")) return "";
  const file = outputRelative.slice("docs/".length).replace(/\.html$/, ".md");
  const index = chapters.indexOf(file);
  if (index < 0) return "";
  const prev = index > 0 ? chapters[index - 1].replace(/\.md$/, ".html") : "";
  const next = index < chapters.length - 1 ? chapters[index + 1].replace(/\.md$/, ".html") : "";
  return '<nav class="chapter-pager" aria-label="章节翻页">' +
    (prev ? '<a href="' + prev + '">← 上一章</a>' : "<span></span>") +
    (next ? '<a href="' + next + '">下一章 →</a>' : '<a href="../labs/notes-site/index.html">综合实验 →</a>') +
    "</nav>";
}

function pageTemplate(title, body, outputRelative, isHome = false) {
  const prefix = depthPrefix(outputRelative);
  const active = outputRelative === "index.html" ? "" : outputRelative;
  const canonicalPath = outputRelative === "index.html" ? "" : outputRelative;
  const canonicalUrl = siteBase + "/" + canonicalPath;
  return '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="description" content="' + siteDescription + '">' +
    '<link rel="canonical" href="' + canonicalUrl + '">' +
    '<meta property="og:type" content="website">' +
    '<meta property="og:locale" content="zh_CN">' +
    '<meta property="og:site_name" content="Learning Linux">' +
    '<meta property="og:title" content="' + escapeHtml(title) + '">' +
    '<meta property="og:description" content="' + siteDescription + '">' +
    '<meta property="og:url" content="' + canonicalUrl + '">' +
    "<title>" + escapeHtml(title) + "｜Learning Linux</title>" +
    '<link rel="stylesheet" href="' + prefix + 'assets/styles.css">' +
    '<script defer src="' + prefix + 'assets/app.js"></script></head><body>' +
    '<a class="skip-link" href="#main">跳到正文</a>' + navHtml(prefix, active) +
    '<div class="page"><header class="topbar"><button class="menu-button" id="menuButton" aria-controls="sidebar" aria-expanded="false">目录</button>' +
    '<div><span class="verified-dot"></span>来源核对 ' + checkedDate + '</div><div class="topbar-mode">离线 HTML · 不执行命令</div></header>' +
    '<main id="main" class="' + (isHome ? "home" : "content") + '">' +
    (isHome ? statePanel() : "") + '<article class="prose">' + body + "</article>" +
    chapterPager(outputRelative) + '<footer class="page-footer">本教程只提供文件与操作指导。执行任何安装、管理员命令或 Docker 变更前，请先确认目标、影响和恢复方法。</footer>' +
    "</main></div></body></html>";
}

function writePage(sourcePath, outputRelative, isHome = false, appendedBody = "") {
  const markdown = fs.readFileSync(sourcePath, "utf8");
  const output = path.join(dist, ...outputRelative.split("/"));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate(titleFromMarkdown(markdown), markdownToHtml(markdown) + appendedBody, outputRelative, isHome), "utf8");
}

function labFilesPage() {
  const labRoot = path.join(root, "labs", "notes-site");
  const files = ["AGENTS.md", "Dockerfile", "compose.yaml", ".dockerignore", "verify.sh", "site/index.html", "site/styles.css"];
  const sections = files.map((name) => {
    const content = fs.readFileSync(path.join(labRoot, ...name.split("/")), "utf8");
    return '<section><h2 id="' + slugify(name) + '">' + escapeHtml(name) + '</h2><div class="code-block">' +
      '<div class="code-label">source</div><pre><code>' + escapeHtml(content) + "</code></pre></div></section>";
  }).join("");
  return pageTemplate("综合项目文件清单", '<h1>综合项目文件清单</h1><p>以下为完整教学项目源码，仅用于阅读、复制和练习。页面不会执行这些内容。</p>' + sections, "labs/notes-site/files.html");
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
fs.copyFileSync(path.join(root, "html-src", "styles.css"), path.join(dist, "assets", "styles.css"));
fs.copyFileSync(path.join(root, "html-src", "app.js"), path.join(dist, "assets", "app.js"));

writePage(path.join(root, "README.md"), "index.html", true);
for (const chapter of chapters) {
  writePage(path.join(root, "docs", chapter), "docs/" + chapter.replace(/\.md$/, ".html"));
}
for (const [name] of references) {
  writePage(path.join(root, "docs", name), "docs/" + name.replace(/\.md$/, ".html"));
}
writePage(
  path.join(root, "labs", "notes-site", "README.md"),
  "labs/notes-site/index.html",
  false,
  '<aside class="next-step"><strong>随书源码</strong><a href="files.html">在页面中查看全部项目文件 →</a></aside>'
);
fs.writeFileSync(path.join(dist, "labs", "notes-site", "files.html"), labFilesPage(), "utf8");

fs.writeFileSync(
  path.join(dist, "404.html"),
  pageTemplate(
    "页面未找到",
    '<h1>页面未找到</h1><p>这个地址不存在或已经移动。你可以返回教程首页，重新从章节目录进入。</p><p><a href="index.html">← 返回教程首页</a></p>',
    "404.html"
  ),
  "utf8"
);

const sitemapPages = [
  "",
  ...chapters.map((name) => "docs/" + name.replace(/\.md$/, ".html")),
  ...references.map(([name]) => "docs/" + name.replace(/\.md$/, ".html")),
  "labs/notes-site/index.html",
  "labs/notes-site/files.html"
];
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapPages.map((page) => "  <url><loc>" + siteBase + "/" + page + "</loc></url>").join("\n") +
  "\n</urlset>\n";
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: " + siteBase + "/sitemap.xml\n", "utf8");

const labTarget = path.join(dist, "lab-files", "notes-site");
fs.mkdirSync(labTarget, { recursive: true });
for (const name of ["AGENTS.md", "Dockerfile", "compose.yaml", ".dockerignore", "verify.sh"]) {
  fs.copyFileSync(path.join(root, "labs", "notes-site", name), path.join(labTarget, name));
}
fs.cpSync(path.join(root, "labs", "notes-site", "site"), path.join(labTarget, "site"), { recursive: true });

console.log("html_pages=" + (2 + chapters.length + references.length + 2));
console.log("output=" + dist);
