# MyBlog

Arch 的个人博客。深色科技感、纯静态构建、部署到 Nginx。

当前进度：**M1 — 全局布局与路由骨架**。

## 本地开发

```bash
pnpm install
pnpm dev
```

打开 http://localhost:5173/ 。

## 构建与预览

```bash
pnpm typecheck
pnpm build
pnpm preview
```

构建产物在 `dist/`，可直接作为 Nginx 的静态站点根目录。

## 技术栈

- Vite 8 + Vue 3 + TypeScript
- Vue Router 4（history 模式）
- Tailwind CSS v4 + CSS 设计令牌
- Space Grotesk / JetBrains Mono（通过 Fontsource 自托管）

## 路由

| 路径 | 页面 | 状态 |
| --- | --- | --- |
| `/` | 首页 | Hero + 精选文章 + 最新文章 |
| `/posts` | 文章 | M1 占位 |
| `/about` | 关于 | M1 占位 |
| `*` | 404 | 已实现 |

## 目录

```text
src/
├─ assets/styles/        # tokens / base / effects
├─ components/
│  ├─ layout/            # SiteHeader / SiteFooter / ThemeToggle / LogoMark
│  ├─ ui/                # BaseButton / BaseCard / BaseTag / BaseInput / SectionHeading / PagePlaceholder
│  └─ DesignPreview.vue  # M0 设计系统预览（保留备用）
├─ composables/          # useTheme
├─ config/site.ts        # 站点信息
├─ pages/                # Home / Posts / About / NotFound
├─ router/index.ts       # 路由表、滚动行为、页面标题
├─ App.vue               # 全局 Header / RouterView / Footer
└─ main.ts
```

## 部署（Nginx 参考）

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/myblog/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 说明

- M1 已接入全局 Header / Footer、Vue Router 与 404 页面；文章页与关于页仍为占位。
- 首页目前包含 Hero、精选文章与最新文章，文章卡片暂时链接到 `/posts`。
- `DesignPreview.vue` 保留为设计系统参考组件，当前未挂载到路由。
- 浅色主题通过覆盖语义变量实现，无需重写组件。
- 所有动效遵循 `prefers-reduced-motion`。

## 如何发布新文章

所有文章都集中在一个文件里维护：`src/data/posts.ts`。它是一个 TypeScript 数组，发新文章就是在 `posts` 数组里追加一个对象。

### 1. 添加一篇文章

打开 `src/data/posts.ts`，在 `posts` 数组里追加：

```ts
{
  id: 4,                     // 数字 ID，全局唯一
  title: '文章标题',
  date: '2026-11-20',        // 格式 YYYY-MM-DD
  readingTime: '8 分钟',      // 预计阅读时长
  summary: '一句话摘要，会显示在首页和列表页的卡片上。',
  tags: ['前端', 'Vue'],      // 标签，用于列表页的标签筛选
  featured: true,            // 可选，true 则进入首页「精选文章」区
  content: `正文内容（Markdown）。

## 二级标题

支持 **加粗**、行内 \`代码\`、> 引用、列表，以及围栏代码块。`,
}
```

字段说明：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `number` | 是 | 唯一编号，对应详情页路由 |
| `title` | `string` | 是 | 标题 |
| `date` | `string` | 是 | 发布日期，`YYYY-MM-DD`，用于排序展示 |
| `readingTime` | `string` | 是 | 阅读时长文案，如 `'8 分钟'` |
| `summary` | `string` | 是 | 摘要，显示在卡片上 |
| `tags` | `string[]` | 是 | 标签数组 |
| `content` | `string` | 是 | 正文，Markdown 格式（支持标题、加粗/斜体、行内代码、链接、引用、列表、代码块、分隔线） |
| `featured` | `boolean` | 否 | 置顶标记，`true` 则展示在首页「精选文章」区 |

### 2. ID 与路由的对应关系

详情页路由为 `/posts/:id`，其中 `:id` 就是文章的 `id`：

| id | 访问路径 |
| --- | --- |
| 1 | `/posts/1` |
| 2 | `/posts/2` |

首页和列表页的卡片会自动链接到 `/posts/{id}`，因此 `id` 必须唯一、不要重复，建议按发布顺序递增。

### 3. 更新本地预览

改完数据后：

- 如果开发服务器已在运行：保存文件即可，Vite 会自动热更新（HMR），刷新浏览器就能看到。
- 如果还没启动，运行：

```bash
pnpm dev
```

然后打开 http://localhost:5173/ 。

> 上线前记得重新构建：`pnpm build`，再把 `dist/` 部署到服务器。
