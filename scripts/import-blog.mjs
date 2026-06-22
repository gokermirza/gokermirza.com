// One-off importer: pulls the 10 Wix blog posts (full body) into MDX files.
// Run: node scripts/import-blog.mjs
import { load } from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_DIR = join(ROOT, "src/app/blog/posts");
const IMG_DIR = join(ROOT, "public/images/blog");
const FEED_PATH = join(ROOT, "..", "blog-feed.xml");

// ASCII-kebab slug from a Turkish title
const TR = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };
function slugify(s) {
  return s
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (m) => TR[m] ?? m)
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Strip Wix CDN transform so we fetch a large clean image, keep extension
function bestImage(url) {
  // .../media/<id>~mv2.png/v1/fit/w_1000,h_1000,al_c,q_80/file.png  -> .../media/<id>~mv2.png
  const m = url.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)\//);
  return m ? m[1] : url;
}

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});
turndown.use(gfm);
// unwrap styled spans to plain text
turndown.addRule("stripStyleSpans", {
  filter: ["span"],
  replacement: (content) => content,
});
// Ricos tables wrap cell text in <div><p>; build a clean markdown table from text
turndown.addRule("ricosTable", {
  filter: "table",
  replacement: (_content, node) => {
    const rows = Array.from(node.querySelectorAll("tr"));
    if (!rows.length) return "";
    const cellsOf = (r) =>
      Array.from(r.querySelectorAll("th,td")).map((c) =>
        (c.textContent || "").trim().replace(/\s+/g, " ").replace(/\|/g, "\\|"),
      );
    const head = cellsOf(rows[0]);
    const line = (cells) => `| ${cells.join(" | ")} |`;
    const sep = `| ${head.map(() => "---").join(" | ")} |`;
    const body = rows.slice(1).map((r) => line(cellsOf(r)));
    return `\n\n${[line(head), sep, ...body].join("\n")}\n\n`;
  },
});

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`img ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

function cleanMarkdown(md) {
  return md
    .replace(/ /g, " ")
    .replace(/(https:\/\/static\.wixstatic\.com\/media\/[^/)\s]+)\/v1\/[^)\s]+/g, "$1")
    .replace(/^[ \t]*[·•‣◦][ \t]+/gm, "- ")
    .replace(/^(\d+)\.[ \t]+/gm, "$1. ")
    .replace(/^#{1,6}[ \t]*$/gm, "")
    // escape MDX-significant chars so literal < { } in prose aren't parsed as JSX/expr
    .replace(/[<{}]/g, "\\$&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  await mkdir(POSTS_DIR, { recursive: true });
  await mkdir(IMG_DIR, { recursive: true });

  const xml = await readFile(FEED_PATH, "utf8");
  const $f = load(xml, { xmlMode: true });

  const items = [];
  $f("item").each((_, el) => {
    const $el = $f(el);
    items.push({
      title: $el.find("title").first().text().trim(),
      link: $el.find("link").first().text().trim(),
      desc: $el.find("description").first().text().trim(),
      date: new Date($el.find("pubDate").first().text().trim()).toISOString().slice(0, 10),
      image: $el.find("enclosure").attr("url") || "",
      cats: $el.find("category").map((__, c) => $f(c).text().trim()).get(),
    });
  });

  console.log(`Feed: ${items.length} posts`);

  for (const it of items) {
    const slug = slugify(it.title);
    console.log(`\n-> ${slug}  (${it.date})`);

    // cover image
    let imagePath = "";
    if (it.image) {
      const src = bestImage(it.image);
      const ext = (src.match(/\.(png|jpg|jpeg|webp)/i)?.[1] || "jpg").toLowerCase();
      const file = `${slug}.${ext}`;
      try {
        await download(src, join(IMG_DIR, file));
        imagePath = `/images/blog/${file}`;
        console.log(`   cover ok: ${file}`);
      } catch (e) {
        console.log(`   cover FAIL: ${e.message}`);
      }
    }

    // body
    let body = "";
    try {
      const res = await fetch(encodeURI(decodeURI(it.link)), {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      const html = await res.text();
      const $ = load(html);
      const node = $('[data-id="content-viewer"]').first();
      if (!node.length) throw new Error("content-viewer not found");
      // drop empty helper + decorative (absolutely-positioned border) divs
      node.find("[data-hook='rcv-block-first']").remove();
      node.find('[style*="position:absolute"]').remove();
      body = cleanMarkdown(turndown.turndown(node.html() || ""));
      console.log(`   body ok: ${body.length} chars`);
    } catch (e) {
      console.log(`   body FAIL: ${e.message}`);
      body = it.desc;
    }

    const fm = [
      "---",
      `title: ${JSON.stringify(it.title)}`,
      `summary: ${JSON.stringify(it.desc)}`,
      imagePath ? `image: ${JSON.stringify(imagePath)}` : null,
      `publishedAt: ${JSON.stringify(it.date)}`,
      it.cats.length ? `tag: ${JSON.stringify(it.cats[0])}` : null,
      "---",
      "",
    ].filter(Boolean).join("\n");

    await writeFile(join(POSTS_DIR, `${slug}.mdx`), `${fm}\n${body}\n`, "utf8");
    console.log(`   wrote ${slug}.mdx`);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
