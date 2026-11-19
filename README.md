<div align="center">

# Tristan

**个人主页 · 技术博客 · 数字花园**

一个用 Vue 3 + Vite + Tailwind CSS 构建的纯静态个人站点，融合 Material Design 3 语义令牌与毛玻璃视觉，记录代码、设计与生活。

[在线预览](https://tirster.xin) · [RSS](https://tirster.xin/feed.xml) · [文章](https://tirster.xin/posts) · [关于](https://tirster.xin/about)

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![Material Design 3](https://img.shields.io/badge/Material_Design-3-6750a4?logo=materialdesign&logoColor=white)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)

</div>

---

## 项目简介

Tristan 是一个面向个人表达的前端站点：首页承载个人名片、月度动态与精选文章，文章页提供完整的 Markdown 阅读体验，另有技能、友链与关于页面。全站为 **Vue 3 单页应用（SPA）**，没有 SSR/SSG 运行时；内容集中维护在 `src/data/` 的 TypeScript 数据文件中，构建后输出纯静态资源，可部署到任意静态服务器或 Nginx。

视觉上采用深色优先的科技感设计，通过一套语义化的 CSS 令牌同时驱动深浅两套主题，并映射为 Material Design 3 的 color roles、state layers 与 elevation。顶部导航被设计为悬浮的毛玻璃 Dock，把天气、搜索、主题切换与音乐控制收进同一条操作带。

## 核心特性

| 特性 | 说明 |
| --- | --- |
| **毛玻璃 Dock 栏** | 顶部悬浮胶囊导航，`backdrop-filter` 毛玻璃质感 + M3 elevation 阴影；桌面端常驻，移动端折叠为下拉菜单。 |
| **歌词与天气深度融合** | 播放音乐时，当前歌词在 Dock 中央逐行切换；天气组件位于同一操作带，展示城市、温度与天气状况。 |
| **全局音乐播放器** | `<audio>` 与播放状态保存在模块级单例中，切换路由不中断；支持播放 / 暂停、进度拖拽与 LRC 歌词二分查找同步。 |
| **实时天气** | 基于 Open-Meteo 免费接口，无需 API Key；30 分钟本地缓存，请求失败时回退旧缓存并标记为缓存数据。 |
| **Material Design 3** | 语义令牌映射到 M3 的 primary / secondary / surface / outline 等角色，配合 state layers、elevation 与 Tailwind CSS v4 工具类。 |
| **深浅色模式** | 深色优先，一键切换浅色主题；偏好写入 `localStorage`，并在 HTML 内联脚本中提前恢复，避免首屏闪烁。 |
| **全文搜索** | `Ctrl / ⌘ + K` 唤起搜索面板，覆盖标题、摘要、标签与正文；结果带关键词高亮与正文片段预览。 |
| **标签体系** | `/tags` 自动汇总全部标签与文章数量，`/tags/:tag` 查看该标签下的文章。 |
| **分享海报** | 文章详情页可生成 1200 × 630 的 PNG 分享图，Canvas 手写绘制，无第三方依赖。 |
| **RSS 订阅** | 构建时从文章数据生成 `dist/feed.xml`，页脚与关于页均提供 RSS 入口。 |
| **Markdown 阅读体验** | 自研极简 Markdown 渲染器，支持标题、粗斜体、行内代码、链接、引用、列表、代码块与分隔线；文章页含目录高亮与阅读进度条。 |
| **首页叙事** | Hero 钉住滚动动画、月度时间线、精选项目与精选 / 最新文章；系统开启「减少动态」时自动降级为静态名片。 |
| **完整站点页面** | 首页、文章列表、文章详情、标签、技能、友链、关于与 404 页面，路由切换带过渡动画。 |
| **无障碍与细节** | 语义化标签、键盘可达、`focus-visible` 焦点环、`prefers-reduced-motion` 降级、移动端优先的响应式布局。 |

## 技术栈

| 分类 | 技术 | 用途 |
| --- | --- | --- |
| 框架 | [Vue 3](https://vuejs.org/) `3.5` | Composition API + `<script setup>` |
| 路由 | [Vue Router](https://router.vuejs.org/) `4.6` | History 模式、滚动行为、页面标题 |
| 语言 | [TypeScript](https://www.typescriptlang.org/) `5.9` | `strict` 模式，全量类型检查 |
| 构建 | [Vite](https://vite.dev/) `8` | 开发服务器与生产构建 |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) `4` | `@tailwindcss/vite` 插件 + CSS 设计令牌 |
| 设计系统 | Material Design 3 | 颜色角色、状态层、阴影层级 |
| 工具库 | [VueUse](https://vueuse.org/) `15` | 滚动与窗口尺寸等组合式工具 |
| 字体 | [Fontsource](https://fontsource.org/) | 自托管 Space Grotesk / JetBrains Mono 可变字体 |
| 质量 | ESLint 9 + typescript-eslint + eslint-plugin-vue | 代码规范检查 |
| 格式化 | Prettier 3 | 统一代码风格 |
| 包管理 | pnpm `11.28.5` | 依赖安装与脚本执行 |

## 快速开始

### 环境要求

- **Node.js ≥ 22.6**（RSS 脚本使用 Node 原生 TypeScript 类型剥离；推荐使用 22 LTS 或更新版本）
- **pnpm 11**（项目在 `package.json` 中通过 `packageManager` 锁定版本）

### 本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/Triste7722/tirstan-garden.git
cd tirstan-garden

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

打开 <http://localhost:5173/> 即可预览。开发服务器默认监听所有网卡，方便局域网设备调试。

### 构建与预览

```bash
# 类型检查
pnpm typecheck

# 生产构建（类型检查 + Vite 构建 + 生成 RSS）
pnpm build

# 本地预览构建产物
pnpm preview
```

构建输出位于 `dist/`，其中包含 `index.html`、带内容哈希的静态资源，以及构建期生成的 `feed.xml`。

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动 Vite 开发服务器（HMR） |
| `pnpm build` | 类型检查 → 构建 → 生成 RSS |
| `pnpm preview` | 预览 `dist/` 构建产物 |
| `pnpm typecheck` | 仅运行 `vue-tsc --noEmit` |
| `pnpm lint` | 运行 ESLint |
| `pnpm lint:fix` | 自动修复可修复的 ESLint 问题 |
| `pnpm format` | 使用 Prettier 格式化全项目 |
| `pnpm format:check` | 检查格式是否符合规范 |
| `pnpm rss` | 单独生成 `dist/feed.xml`（需先有 `dist/`） |

## 目录结构

```text
.
├─ public/                    # 静态资源：背景图、头像、音乐、歌词、项目截图
├─ scripts/
│  └─ generate-rss.mjs        # 构建期 RSS 2.0 生成脚本
├─ src/
│  ├─ assets/styles/          # tokens / base / effects / prose
│  ├─ components/
│  │  ├─ layout/              # SiteHeader（Dock）、DockWeather、SiteSearch、ThemeToggle 等
│  │  ├─ home/                # HeroSection、ProjectsSection、TimelineSection
│  │  └─ ui/                  # Base* 基础组件、PostCard、Chip、Accordion、EmptyState 等
│  ├─ composables/            # useTheme、usePlayer、useWeather、useScrollSpy
│  ├─ config/                 # site、announcement、backgrounds、layout、weather
│  ├─ data/                   # posts、about、projects、timeline、skills、friends
│  ├─ pages/                  # Home、Posts、PostDetail、Tags、TagDetail、Skills、Friends、About、404
│  ├─ router/index.ts         # 路由表、滚动行为与页面标题
│  ├─ utils/                  # markdown、lrc、format、search、sharePoster
│  ├─ App.vue
│  └─ main.ts
├─ index.html                 # HTML 入口与首屏主题恢复脚本
├─ vite.config.ts
├─ deploy.sh                  # 个人部署脚本（构建 + SSH/SCP + Nginx 重载）
├─ nginx.conf                 # Nginx 参考配置（SPA 回退、缓存与 gzip）
└─ package.json
```

**数据与视图分离**：文章、关于、项目、时间线、技能与友链都在 `src/data/` 中维护；站点名称、导航、社交链接、建站日期等全局配置在 `src/config/site.ts`。

## 路由一览

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | Hero 滚动动画、月度时间线、精选项目、精选 / 最新文章 |
| `/posts` | 文章列表 | 标签筛选 + 卡片网格 |
| `/posts/:id` | 文章详情 | Markdown 渲染、目录高亮、阅读进度、分享海报 |
| `/tags` | 标签总览 | 自动汇总标签与文章数量 |
| `/tags/:tag` | 标签详情 | 指定标签下的文章列表 |
| `/skills` | 技能 | 技术栈与熟练度自评 |
| `/friends` | 友链 | 友站展示 |
| `/about` | 关于 | 个人简介、经历、技术栈与联系方式 |
| `*` | 404 | 未匹配路由 |

## 内容维护

### 发布新文章

所有文章集中在 `src/data/posts.ts`，在 `posts` 数组中追加一个对象即可：

```ts
{
  id: 7,
  title: '文章标题',
  date: '2026-11-20',
  readingTime: '8 分钟',
  summary: '一句话摘要，显示在文章卡片上。',
  tags: ['前端', 'Vue'],
  featured: true, // 可选：标记为精选
  content: `正文内容（Markdown）。

## 二级标题

支持 **加粗**、行内 \`代码\`、> 引用、列表与围栏代码块。`,
}
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `number` | 是 | 唯一编号，同时作为 `/posts/:id` 路由参数 |
| `title` | `string` | 是 | 文章标题 |
| `date` | `string` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `readingTime` | `string` | 是 | 阅读时长文案，如 `'8 分钟'` |
| `summary` | `string` | 是 | 摘要，用于列表与搜索预览 |
| `tags` | `string[]` | 是 | 标签数组，自动进入标签体系 |
| `content` | `string` | 是 | Markdown 正文 |
| `featured` | `boolean` | 否 | 精选标记，首页「精选文章」区域消费 |

### 调整站点信息

- 站点名称、Slogan、导航、社交链接、正式域名：`src/config/site.ts`
- 天气城市（经纬度与展示名）：`src/config/weather.ts`
- 顶部公告：`src/config/announcement.ts`
- 背景图与项目截图：`public/`

> 修改 `site.url` 后，RSS、分享海报与绝对链接会同步更新。

## 部署说明

### 方式一：`deploy.sh` + Nginx（当前使用）

仓库内提供个人部署脚本 `deploy.sh`，执行流程为：

1. `pnpm build` 构建静态产物；
2. 通过 SSH / SCP 上传 `dist/` 与 `nginx.conf`；
3. 在服务器上覆盖站点目录、写入 Nginx 配置；
4. 执行 `nginx -t` 校验并 `nginx -s reload` 重载。

使用前请根据实际环境修改脚本顶部的 `SERVER`、`REMOTE_TMP` 与 `NGINX_CONF_PATH`，并确保本机已配置免密 SSH：

```bash
bash deploy.sh
```

`nginx.conf` 已包含 SPA history 路由所需的 `try_files $uri $uri/ /index.html` 回退，以及静态资源长缓存和 gzip 配置。

### 方式二：任意静态托管

`dist/` 是完整的静态站点，也可以直接部署到 Vercel、Netlify、Cloudflare Pages 或对象存储。只需注意：

- 将所有未匹配路径回退到 `/index.html`，否则刷新 `/posts/1` 等前端路由会 404；
- 保留构建生成的 `/feed.xml`，RSS 订阅依赖它；
- 若部署在子路径下，请同步调整 `vite.config.ts` 中的 `base`。

### Nginx 最小示例

```nginx
server {
    listen 80;
    server_name example.com;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## 开源协议

本项目基于 **GNU General Public License v3.0** 开源，完整协议文本见 [LICENSE](./LICENSE)。

你可以自由使用、修改与分发本项目，但衍生作品需以相同协议开源，且不提供任何担保。转载请注明出处。
