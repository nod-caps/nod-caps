import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  constructor( private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({title: 'Our Story - UK Baseball Caps | nod caps', description:'nod caps are a small team based in Edinburgh focusing exclusively on producing quality caps for anyone to wear. Buy nod caps now. ', image: '/assets/img/cap-image.jpg' });

  }

}
