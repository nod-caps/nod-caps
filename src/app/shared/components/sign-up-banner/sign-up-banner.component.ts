import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-banner',
  templateUrl: './sign-up-banner.component.html',
  styleUrls: ['./sign-up-banner.component.scss'],
})
export class SignUpBannerComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  signedUpDone = false;


  signedUp(done: any) {
    if (done) {
      this.signedUpDone = true
    }
  }

  goTo(link: string) {
    this.router.navigateByUrl(link)
  }

  ngOnInit() {
    
  }

}
