import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {

  orderNumber: any;

  constructor(
    private router:Router,
    private route: ActivatedRoute
  ) { }


  goHome(){
    this.router.navigateByUrl('home');
  }

  ngOnInit() {
    this.orderNumber = this.route.snapshot.paramMap.get('orderNumber');
  }

}
