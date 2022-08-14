import { ScullyConfig } from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import  { getFlashPreventionPlugin }  from '@scullyio/scully-plugin-flash-prevention';


/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'

const defaultPostRenderers = ['seoHrefOptimise', criticalCSS, getFlashPreventionPlugin()];

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  defaultPostRenderers,
  routes: {
    /*'/my-orders': {
       type: 'ignored',
     },
     '/about': {
      type: 'ignored',
     },*/
  },
  extraRoutes: [
    '/shop/The-Original-Collection/Out-of-the-Blue',
    '/shop/The-Original-Collection/Down-to-Earth',
    '/shop/The-Original-Collection/Daily-Driver',
    '/nod-sitemap',
  ],
}