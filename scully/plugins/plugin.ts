

import { registerPlugin, getPluginConfig } from '@scullyio/scully';  
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

export const myPlugin = 'myPlugin';  
  
const addTrailingSlashPlugin = async (html:any, options:any) => {
  try {
    
    const dom = new JSDOM(html);
    const {window} = dom;
    const anchors = window.document.querySelectorAll('a[href^="/"]');
    Array.prototype.forEach.call(anchors, (a: any) => {
        const href =  a.getAttribute('href');

        const endsWithSlash = href.endsWith('/');
        if ( !endsWithSlash ) {
            a.setAttribute('href', href + '/');
          
        }
    });
    return dom.serialize();
  } catch (e) {
    // logWarn(`error in trailingSlash, didn't parse for route "${yellow(route.route)}"`);
  }
  return html;
};
  
const validator = async () => [];  

registerPlugin('render', myPlugin, addTrailingSlashPlugin, validator);  
