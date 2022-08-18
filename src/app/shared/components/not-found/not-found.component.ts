import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/fb.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {


  caps: any[];

  constructor(
    private fb: FirebaseService,
    private seo: SeoService
  ) { }



  async getHats() {
    this.fb.getCollectionCaps('The-Original-Collection').then(data => {
      if(data) {
        this.caps = data
      }
    });
  }

  ngOnInit() {
    this.getHats();
    this.seo.generateTags({title: 'Page Not Found | nod caps', description:'We could not find the page you are looking for, please go to home and try again.' });

  }

}
