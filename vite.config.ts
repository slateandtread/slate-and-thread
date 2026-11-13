import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const routes = ['/', '/services', '/services/landing-page', '/services/business-website', '/services/ecommerce', '/services/ui-ux', '/services/redesign', '/services/custom', '/work', '/about', '/process', '/pricing', '/contact', '/start-project', '/privacy']

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, '.', '').VITE_SITE_URL?.replace(/\/$/, '')
  const indexingFiles: Plugin = {
    name: 'site-indexing-files',
    apply: 'build' as const,
    generateBundle() {
      if (!siteUrl) return
      const entries = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>` })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n` })
    },
  }

  return {
    plugins: [react(), tailwindcss(), indexingFiles],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('@supabase')) return 'supabase'
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react-router') || id.includes('/react/') || id.includes('/react-dom/')) return 'framework'
          },
        },
      },
    },
  }
})
