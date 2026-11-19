// ==========================================================================
// 关于页内容
// 正文《小糊涂仙传》以「段落数组 + 高亮片段」结构化存储，由组件渲染，
// 避免在模板里手写大段 HTML；文字与标点原样保留。
// ==========================================================================

export interface HighlightSegment {
  text: string
  /** 高亮色调，映射 M3 容器色：primary / secondary / tertiary */
  tone?: 'primary' | 'secondary' | 'tertiary'
}

export interface ArticleParagraph {
  segments: HighlightSegment[]
  /** 渲染为引用块（如文末叹辞） */
  quote?: boolean
}

export interface AboutProfile {
  nickname: string
  tagline: string
  location: string
  status: string
}

export interface ExperienceItem {
  date: string
  title: string
  description?: string
}

export const aboutProfile: AboutProfile = {
  nickname: '小糊涂仙',
  tagline: '写点代码，也写点生活。',
  location: '中国 · 待补充',
  status: '好读书，不求甚解',
}

export const articleParagraphs: ArticleParagraph[] = [
  {
    segments: [
      {
        text: '先生不知何许人也，亦不详其姓字，自号小糊涂仙。好读书，不求甚解，尤好陆王之说，每有会意，欣然忘食。至“',
      },
      { text: '知行合一', tone: 'primary' },
      { text: '”处，常自谓得之。' },
    ],
  },
  {
    segments: [
      {
        text: '喜静，好论事。人有执一端者，必问其利几何、害几何，四面换位，推其轻重而后言。或问：“子不论是非乎？”先生曰：“',
      },
      {
        text: '是非在后，利害在先。利则行，害则止，改与不改，徐图之。',
        tone: 'primary',
      },
      { text: '”问者曰：“然则无守乎？”曰：“有。' },
      {
        text: '守其底，不守其途。底不可低，高不可贪，中间择其可者。定则不移，低则争，高则舍。',
        tone: 'secondary',
      },
      { text: '摇摇然左右取者，失其大者也。', tone: 'tertiary' },
      { text: '”' },
    ],
  },
  {
    segments: [
      {
        text: '性嗜酒，每得佳酿，自斟自饮。醉则论古今人物，醒则不复多言。一日酒醒，自问平生所求，久不能答，遂叹曰：',
      },
    ],
  },
  {
    quote: true,
    segments: [
      {
        text: '呜呼伤哉！繄何人？繄何人？天实为之，谓之何哉？人实为之，谓之何哉！',
        tone: 'primary',
      },
      { text: '吾尝徐图之，图至今日，所图者安在？' },
      { text: '我生之初尚无为，我生之后道祚衰！', tone: 'secondary' },
    ],
  },
]

export const experiences: ExperienceItem[] = [
  {
    date: '2026-10',
    title: '博客上线',
    description: '发布网站雏形，开始记录折腾与日常。',
  },
  {
    date: '2026-11',
    title: '安装 Arch Linux',
    description: '重新安装 Arch Linux，并配置 Hyprland 桌面环境。',
  },
  {
    date: '2026-11',
    title: '开源个人主页',
    description: '开源个人主页项目（基于 Vue 3 + Vite + Tailwind），已在 GitHub 开源并持续迭代',
  },
]

export const techStack = ['Vue 3', 'Vite', 'Tailwind CSS', 'Material 3']
