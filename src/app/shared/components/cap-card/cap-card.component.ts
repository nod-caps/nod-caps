import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cap-card',
  templateUrl: './cap-card.component.html',
  styleUrls: ['./cap-card.component.scss'],
})
export class CapCardComponent implements OnInit {


  @Input() cap: any;
  @Input() collectionRef: any; 
  constructor(
    private router: Router
  ) { }

  goToHat(cap: any){
    this.router.navigateByUrl('shop/' + this.collectionRef + '/' + cap.nameHyphenated);
    }

    
  ngOnInit() {}

}
