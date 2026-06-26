import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tutorial",
  description: "Tutorial",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Superpowers', link: '/superpowers/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Superpowers',
        items: [
          { text: '简介', link: '/superpowers/' },
          { text: '安装与快速开始', link: '/superpowers/install' },
          { text: '核心工作流', link: '/superpowers/workflow' },
          { text: 'Skills 速查表', link: '/superpowers/skills' },
          { text: '设计哲学与常见问题', link: '/superpowers/philosophy' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
