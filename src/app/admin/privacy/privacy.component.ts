import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {

  constructor(
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.generateTags({title: 'Privacy Policy - UK Baseball Caps | nod caps', description:'Please read our privacy policy for using nod caps.', image: '/assets/img/cap-image.jpg' });

  }

}
