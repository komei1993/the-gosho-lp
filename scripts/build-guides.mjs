// 手順ガイド(/guide/<slug>/)を data/guides/*.mjs から一括生成する。
//   node scripts/build-guides.mjs
//
// 記事を増やすときは data/guides/ に 1 ファイル足すだけ。構造:
//   export default {
//     slug, title, description, lead,
//     note?: { title, html },                 // 冒頭の注意書き
//     steps: [{ title, items: [..], img?, alt?, caption?, after? }],
//     faq?: [{ q, a }],                        // a は HTML 可
//     related?: [{ href, label }],             // 末尾の関連リンク
//   }
// 画像は assets/guide/ に 1600x1200(4:3 白フレーム)で置く。作り方は
// workspace の scratchpad/frame.py 方式(シミュレーター実画面を枠に収める)。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data', 'guides');
const OUT_DIR = path.join(ROOT, 'guide');

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stepHtml = (s, i) => `
  <section class="step">
    <h2><span class="step-num">${i + 1}</span>${esc(s.title)}</h2>
    ${s.items?.length ? `<ol>\n${s.items.map((it) => `      <li>${it}</li>`).join('\n')}\n    </ol>` : ''}
    ${s.img ? `<figure>
      <img src="/assets/guide/${esc(s.img)}" alt="${esc(s.alt ?? '')}" loading="lazy" width="1600" height="1200">
      ${s.caption ? `<figcaption>${s.caption}</figcaption>` : ''}
    </figure>` : ''}
    ${s.after ? `<p>${s.after}</p>` : ''}
  </section>`;

const page = (g) => `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(g.title)}｜THE GOSHO</title>
<meta name="description" content="${esc(g.description)}">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/png" href="/assets/app-icon.png">
<link rel="stylesheet" href="/assets/legal.css">
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-title" href="/">THE GOSHO</a>
    <a class="nav-back" href="/guide/">← 使い方</a>
  </div>
</nav>

<main>
  <h1>${esc(g.title)}</h1>
  <p class="lead">${g.lead}</p>

  ${g.note ? `<div class="note">
    <strong>${esc(g.note.title)}</strong>
    <p>${g.note.html}</p>
  </div>` : ''}
${g.steps.map(stepHtml).join('\n')}
${g.faq?.length ? `
  <h2>よくあるご質問</h2>
${g.faq.map((f) => `
  <h3>${esc(f.q)}</h3>
  <p>${f.a}</p>`).join('\n')}` : ''}

  <h2>お問い合わせ</h2>
  <p>解決しない場合は <a href="mailto:mitsuaki@toicake.tokyo">mitsuaki@toicake.tokyo</a> までご連絡ください。お使いの端末と iOS のバージョン、どの手順でつまずいたかをお書き添えいただけると助かります。</p>
${g.related?.length ? `
  <h2>関連ページ</h2>
  <ul>
${g.related.map((r) => `    <li><a href="${esc(r.href)}">${esc(r.label)}</a></li>`).join('\n')}
  </ul>` : ''}
</main>

<footer>
  <a href="/">ホーム</a>
  <a href="/guide/">使い方</a>
  <a href="/support/">サポート</a>
  <a href="/privacy/">プライバシーポリシー</a>
  <p>THE GOSHO は個人が制作した非公式のアプリです。創価学会および関連団体が提供・監修・承認するものではありません。</p>
</footer>

</body>
</html>
`;

// 目次(/guide/)も生成する
const indexPage = (guides) => `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>使い方｜THE GOSHO</title>
<meta name="description" content="THE GOSHO の使い方ガイド一覧">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/png" href="/assets/app-icon.png">
<link rel="stylesheet" href="/assets/legal.css">
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-title" href="/">THE GOSHO</a>
    <a class="nav-back" href="/support/">← サポート</a>
  </div>
</nav>

<main>
  <h1>使い方</h1>
  <p class="lead">THE GOSHO の主な機能の使い方をまとめています。</p>
  <ul class="guide-list">
${guides.map((g) => `    <li><a href="/guide/${esc(g.slug)}/">${esc(g.title)}</a><span>${esc(g.description)}</span></li>`).join('\n')}
  </ul>
</main>

<footer>
  <a href="/">ホーム</a>
  <a href="/support/">サポート</a>
  <a href="/privacy/">プライバシーポリシー</a>
  <p>THE GOSHO は個人が制作した非公式のアプリです。創価学会および関連団体が提供・監修・承認するものではありません。</p>
</footer>

</body>
</html>
`;

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.mjs')).sort();
const guides = [];
for (const f of files) {
  const { default: g } = await import(path.join(DATA_DIR, f));
  guides.push(g);
  const dir = path.join(OUT_DIR, g.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(g));
  console.log(`guide/${g.slug}/index.html`);
}
fs.writeFileSync(path.join(OUT_DIR, 'index.html'), indexPage(guides));
console.log(`guide/index.html (${guides.length} 記事)`);
