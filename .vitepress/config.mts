import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tutorial",
  description: "Tutorial",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '帖子', link: '/posts/ai-agent-tutorials' }
    ],

    sidebar: [
      {
        text: '帖子',
        items: [
          { text: 'AI Agent 26 项目教程', link: '/posts/ai-agent-tutorials' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
