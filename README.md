# 平板竞品分析站 · 部署包

纯静态站点（HTML + CSS + 原生 JS，无构建、无后端、无依赖）。
适合托管到任意静态平台：**GitHub Pages / Vercel / Netlify / 对象存储 + CDN**，零运行成本。

## 文件说明

| 文件 | 作用 |
|------|------|
| `index.html` | 第 1 页 · 概览（全景散点图 / 档位摘要 / 降价榜 / 价格带 / 全规格表） |
| `products.html` | 第 2 页 · 产品列表（快速选品 + 49 款卡片） |
| `insights.html` | 第 3 页 · 市场洞察（按来源分类 + 综合研判） |
| `compare.html` | 对比页（最多 5 款并排参数 + 雷达图） |
| `data.js` | 共享数据 + 选品/渲染/对比逻辑 |
| `styles.css` | 共享样式 |
| `deploy.sh` | 一键部署辅助脚本（见下） |

> 所有页面引用均为相对路径，放任意子目录都能正常打开。

---

## 方案 A：GitHub Pages（推荐，永久免费、零运行成本）

1. 在 GitHub 新建一个**空仓库**（不要勾选 README/.gitignore）。
2. 进入本 `publish/` 目录，执行：
   ```bash
   git init
   git add -A
   git commit -m "feat: 平板竞品分析站 v1"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
3. 仓库 → **Settings → Pages → Source** 选 `main` 分支、`/ (root)`，保存。
4. 等待 1–2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即可。

> 如需自定义域名：在根目录新建 `CNAME` 文件，写入你的域名（如 `tablet.example.com`），并在域名 DNS 处做 CNAME 解析。

---

## 方案 B：Vercel（一行命令，适合临时/快速）

```bash
npm i -g vercel      # 首次需安装
vercel login          # 浏览器授权
vercel --prod         # 在本目录执行，按提示确认即可
```
Vercel 会自动识别为静态站点，无需任何构建配置。

---

## 方案 C：对象存储 + CDN（腾讯云 COS / 阿里云 OSS / Cloudflare R2）

将本目录全部文件上传到存储桶根目录，开启「静态网站托管」并绑定自定义域名/CDN 即可。
适合已有云资源、需要国内访问速度的场景。

---

## 数据口径说明（公开发布前必读）

- 本站的「降价幅度 / 调价 ↑↓」目前采用 **首销价 → 当前官网价** 的变动作为代理指标，
  因为各品牌官网**不公开近 1 个月的逐日调价历史**。
- 若需展示真实的「近 1 月上调/下降」，请提供价格追踪数据源（价格监控 API / 爬虫记录 / 自有表格），
  替换 `data.js` 中各产品的 `monthChange` 字段即可。
- 市场份额、出货等数据来自 IDC / Omdia / 群智咨询 / 京东 618 战报 / IT之家 / 太平洋电脑网，
  已在 `insights.html` 各卡片以 `<span class="src">` 标签标注来源。

---

## 二次修改

- 改产品/价格/规格 → 编辑 `data.js` 顶部的 `products` 数组。
- 改配色/布局 → 编辑 `styles.css`。
- 改文案 → 对应 `*.html`。
- 改完重新 push（GitHub Pages）或重新 `vercel --prod`（Vercel）即生效。
