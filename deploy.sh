#!/usr/bin/env bash
# 一键部署脚本（二选一，按注释选用）
# 用法：bash deploy.sh
set -e

echo "== 平板竞品分析站 · 发布辅助 =="

# ---------- 方案 A：GitHub Pages ----------
# 前置：你已在 GitHub 建好空仓库，并取得其 git 地址（形如 https://github.com/<你>/<repo>.git）
# 把下面的 REPO_URL 改成你的仓库地址，然后运行本脚本即可完成首次 push
REPO_URL="https://github.com/<你的用户名>/<仓库名>.git"

echo "【GitHub Pages】若要用此方案，请先编辑本脚本顶部的 REPO_URL，再取消下方注释："
cat <<'EOF'
# git init -q
# git add -A
# git commit -q -m "feat: 平板竞品分析站 v1"
# git branch -M main
# git remote add origin "$REPO_URL"
# git push -u origin main
# echo "→ 然后到 GitHub 仓库 Settings → Pages → Source 选 main 分支根目录，等待 1-2 分钟即可访问"
EOF

# ---------- 方案 B：Vercel（零配置，需先 npm i -g vercel 并 vercel login） ----------
echo ""
echo "【Vercel】若已安装 vercel CLI 并登录，直接运行："
echo "    vercel --prod"
echo "（本目录即静态根，无需构建，部署即用）"

echo ""
echo "当前目录静态文件："
ls -1
