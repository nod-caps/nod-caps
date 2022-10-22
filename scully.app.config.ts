import { ScullyConfig } from '@scullyio/scully';
 import { MinifyHtml } from 'scully-plugin-minify-html';
 import  { getFlashPreventionPlugin }  from '@scullyio/scully-plugin-flash-prevention';


/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  defaultPostRenderers: [ MinifyHtml, getFlashPreventionPlugin(), 'seoHrefOptimise'],
  routes: {
    '/control': {
      type: 'ignored',
    },
    '/admin-login': {
      type: 'ignored',
    },
   /* '/cheers': {
      type: 'ignored',
    },
    '/my-orders': {
      type: 'ignored',
    },
    '/add-review': {
     type: 'ignored',
   },*/
  },
  extraRoutes: [
    '/shop/The-Original-Collection/Out-of-the-Blue',
    '/shop/The-Original-Collection/Down-to-Earth',
    '/shop/The-Original-Collection/Black-Sheep',
    '/shop/The-Original-Collection/Devil-Wears-nod',
  ],
}