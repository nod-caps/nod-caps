import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SeoService {

  link: any;

  constructor(private title: Title, private meta: Meta, private router: Router,
    @Inject(DOCUMENT) private dom) {
    
     }


  setRobots() {
    this.meta.addTag({ name:'robots', content:'noindex,nofollow' });
  }

  generateTags({ title = '', description = '', image = '' }) {

    if (image === '') {
      image = 'https://www.nodcaps.com/assets/img/nod-caps-share.png'
    }
    let url = 'https://www.nodcaps.com' + this.router.url.split('?')[0] ;
    if (url.indexOf('/home') > -1) {
      url = 'https://www.nodcaps.com'
    } 
   

    const canId = document.getElementById('canonical');
    canId.setAttribute('href', url);
    
    this.title.setTitle(title);
    // this.meta.updateTag({ name: 'og:url', property:'og:url', content: `https://firestarter.fireship.io${this.router.url}` });
    this.meta.updateTag({ name:'og:title', property:'og:title', content: title });
    this.meta.updateTag({ name:'og:url', property:'og:url', content: url });
    this.meta.updateTag({ name:'og:description',  property:'og:description', content: description })
    this.meta.updateTag({ name:'description', content: description })

    this.meta.updateTag({ name:'og:image', property:'og:image', content: image });
    this.meta.updateTag({name:'twitter:card', content: "summary_large_image"});
    this.meta.updateTag({name:'twitter:creator', content: "@nod_caps"});
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });    
    this.meta.updateTag({ name: 'twitter:image', content: image });   




  }
}