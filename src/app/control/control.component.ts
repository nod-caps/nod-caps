import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {

  collections: any[] = [];
  summaryCaps

  constructor(
    private router: Router,
    private seo: SeoService
  ) { }


  ngOnInit() {
    this.seo.setRobots();
  }




  goTo(link: string){
    this.router.navigateByUrl('control/' + link);
  }

}
