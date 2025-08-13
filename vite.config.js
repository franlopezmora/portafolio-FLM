import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    // 👇 Este va primero para que transforme .mdx -> JSX
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        // exporta: export const frontmatter = { ... }
        remarkMdxFrontmatter, 
      ],
    }),
    react({
    }),
  ],
})
