import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {

  collections: any[] = [];

  constructor(
    private router: Router,
  ) { }





  ngOnInit() {
  }


  goTo(link: string){
    this.router.navigateByUrl('control/' + link);
  }

}
