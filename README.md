# Starbeat Docs

基於 **Bun** + **Svelte 5** 的極簡文件生成工具。

## 特色

- ⚡ **極速**：Bun 與 Svelte 5 驅動。
- 📝 **Markdown**：支援 mdsvex 與 Svelte 元件。
- 🎨 **簡約**：現代介面，支援深色模式。
- 💅 **高亮**：內建 Shiki 語法高亮。
- 📂 **路由**：檔案即路由。

## 快速開始

### 安裝依賴

```bash
bun install
```

### 啟動開發伺服器

```bash
bun run dev
```

### 建置生產版本

```bash
bun run build
```

建置後的靜態檔案將位於 `build/` 目錄中。

## 撰寫文件

### 新增頁面

在 `src/routes/docs` 目錄下建立新的 Markdown 檔案，例如 `hello.md`，即可透過 `/docs/hello` 訪問。

```markdown
---
title: Hello World
---

# Hello World

這是一個測試頁面。
```

### 下拉選單設定

編輯 `src/lib/components/Sidebar.svelte` 中的 `navItems` 陣列來設定側邊欄連結。

```javascript
const navItems = [
    { title: 'Introduction', href: '/' },
    { title: 'Getting Started', href: '/docs/getting-started' },
    // 新增你的連結
];
```

## 技術棧

- Runtime: [Bun](https://bun.sh/)
- Framework: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- Markdown: [mdsvex](https://mdsvex.pngwn.io/)
- Syntax Highlighting: [Shiki](https://shiki.style/)
