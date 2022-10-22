import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ScreensizeService } from '../services/screensize.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
     state('void', style({
       opacity:0
     })),
     transition('void <=> *', animate(800))
    ])
  ]
})
export class HomePage implements OnInit {

  isDesktop: boolean;
  isTop = true;
 
  constructor(private screensizeService: ScreensizeService,
    private seo: SeoService,
    @Inject(DOCUMENT) private dom) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });
  }

  onScroll(event: any) {
if (event.detail.scrollTop < 30){
this.isTop = true;
} else {
this.isTop=false;
}
 }

  ngOnInit(){
    this.seo.generateTags({title: 'Quality caps for everyone | nod caps', description:"As the UK's top cap brand, we've got you covered (literally)! We focus exclusively on producing the best baseball caps for anyone to wear. FREE Delivery." });
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', 'https://www.nodcaps.com');
  
  }

}
