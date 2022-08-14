import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss'],
})
export class ReturnsComponent implements OnInit {

  constructor(
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.generateTags({title: 'Returns - UK Baseball Caps | nod caps', description:'We happily accept the return of unused and undamaged items within 30 days of purchase.', image: '/assets/img/cap-image.jpg' });

  }

}
