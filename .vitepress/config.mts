import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tutorial",
  description: "Tutorial",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '帖子', link: '/posts/ai-agent-tutorials' },
      { text: '选模型', link: '/posts/ai-model-selection-for-programmers' },
      { text: '项目流程', link: '/posts/internet-project-lifecycle' }
    ],

    sidebar: [
      {
        text: '帖子',
        items: [
          { text: 'AI Agent 26 项目教程', link: '/posts/ai-agent-tutorials' },
          { text: '程序员如何选 AI 模型', link: '/posts/ai-model-selection-for-programmers' },
          { text: '互联网项目完整流程', link: '/posts/internet-project-lifecycle' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
