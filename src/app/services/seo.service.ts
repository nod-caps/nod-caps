import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  generateTags({ title = '', description = '', image = '' }) {

    this.title.setTitle(title);
    // this.meta.updateTag({ name: 'og:url', property:'og:url', content: `https://firestarter.fireship.io${this.router.url}` });
    this.meta.updateTag({ name:'og:title', property:'og:title', content: title });
    this.meta.updateTag({ name:'og:description',  property:'og:description', content: description })
    this.meta.updateTag({ name:'og:image', property:'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });    
    this.meta.updateTag({ name: 'twitter:image', content: image });   
  }
}