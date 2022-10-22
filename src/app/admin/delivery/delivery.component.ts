import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {

  constructor(
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.generateTags({title: 'Delivery - UK Baseball Caps | nod caps', description:'Free UK Delivery. We aim to deliver your nod cap within 2-4 working days' });

  }

}
