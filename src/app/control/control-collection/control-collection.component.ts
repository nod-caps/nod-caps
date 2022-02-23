import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';


@Component({
  selector: 'app-control-collection',
  templateUrl: './control-collection.component.html',
  styleUrls: ['./control-collection.component.scss'],
})
export class ControlCollectionComponent implements OnInit {

  
  public collections: any[] = [];

  constructor(
    private router: Router,
    private fb: FirebaseService
  ) { }


  goTo(link: any){
    this.router.navigateByUrl(link);
  }

  
async getCollections() {
  this.fb.getCollections().then(data => {
    this.collections = data
  });
 }

  ngOnInit() {
    this.getCollections();
  }

}
