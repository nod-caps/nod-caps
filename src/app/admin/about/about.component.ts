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
    this.seo.generateTags({title: 'Nod Caps About', description:'Buy cheap caps online', image: '/assets/img/cap-image.jpg' });

  }

}
