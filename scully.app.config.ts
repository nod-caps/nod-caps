import { ScullyConfig } from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
 import { MinifyHtml } from 'scully-plugin-minify-html';
 import  { getFlashPreventionPlugin }  from '@scullyio/scully-plugin-flash-prevention';


/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'

// const defaultPostRenderers = [ MinifyHtml, getFlashPreventionPlugin(), criticalCSS, 'seoHrefOptimise' ];

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  defaultPostRenderers: [ MinifyHtml, getFlashPreventionPlugin(), criticalCSS, 'seoHrefOptimise'],
  routes: {
    '/my-orders': {
       type: 'ignored',
     },
     '/cheers': {
      type: 'ignored',
    },
    '/control': {
      type: 'ignored',
    },
    '/admin-login': {
      type: 'ignored',
    },
  },
  extraRoutes: [
    '/shop/The-Original-Collection/Out-of-the-Blue',
    '/shop/The-Original-Collection/Down-to-Earth',
    '/shop/The-Original-Collection/Daily-Driver',
    '/nod-sitemap',
  ],
}