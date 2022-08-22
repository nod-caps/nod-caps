import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }


  setRobots() {
    this.meta.addTag({ name:'robots', content:'noindex,nofollow' });
  }

  generateTags({ title = '', description = '', image = '' }) {
    const url = 'https://projecttwo-c4839.web.app' + this.router.url + '/';
    this.title.setTitle(title);
    // this.meta.updateTag({ name: 'og:url', property:'og:url', content: `https://firestarter.fireship.io${this.router.url}` });
    this.meta.addTag({ name:'og:title', property:'og:title', content: title });
    this.meta.addTag({ name:'og:url', property:'og:url', content: url });
    this.meta.addTag({ name:'og:description',  property:'og:description', content: description })
    this.meta.addTag({ name:'description', content: description })

    this.meta.addTag({ name:'og:image', property:'og:image', content: 'https://projecttwo-c4839.web.app/assets/img/social-slider/social-slider4.jpeg' });
    this.meta.addTag({name:'twitter:card', content: "summary_large_image"});
    this.meta.addTag({name:'twitter:creator', content: "@nodcaps"});
    this.meta.addTag({ name: 'twitter:title', content: title });
    this.meta.addTag({ name: 'twitter:description', content: description });    
    this.meta.addTag({ name: 'twitter:image', content: 'https://projecttwo-c4839.web.app/assets/img/social-slider/social-slider4.jpeg' });   
  }
}