import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {

  constructor(
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.generateTags({title: 'Terms & Conditions - UK Baseball Caps | nod caps', description:'Discover the full terms and conditions for using nod caps. Detailed information on the terms and conditions for using nod caps.', image: '/assets/img/cap-image.jpg' });

  }

}
