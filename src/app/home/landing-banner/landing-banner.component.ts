import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-landing-banner',
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.scss'],
  animations: [
    trigger('fadeInOut', [
     state('void', style({
       opacity:0
     })),
     transition('void <=> *', animate(800))
    ])
  ]
})
export class LandingBannerComponent implements OnInit {


  @Input() isTop: any;

  constructor() { }

  scrollTo(){
    const sec = document.querySelector('.scroll')
    sec.scrollIntoView({ behavior: 'smooth'})
  }

  ngOnInit() {}

}
