import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss'],
})
export class CreateCollectionComponent implements OnInit {


  public editPage = false;
  collectionRef: any;
  collection: any;

  constructor( private router: Router,
    private route: ActivatedRoute,
    private fb: FirebaseService,
    private formBuilder: FormBuilder) { }

   
  collectionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
  });

  get name() {
    return this.collectionForm.get('name');
  }

  get description() {
    return this.collectionForm.get('description');
  }

  public errorMessages = {
    name: [
      { type: 'maxlength', message: 'Name cant be longer than 20 characters'},
      { type: 'minlength', message: 'Name must be longer than 3 characters'},
    ],
    description: [
      { type: 'maxlength', message: 'Description cant be longer than 20 characters'},
      { type: 'minlength', message: 'Description must be longer than 3 characters'},
    ],
  }

  save() {
  }

  goBack() {
  this.router.navigateByUrl('control/collections');
  }
  
getCollection() {
  this.fb.getSingleCollection(this.collectionRef).then(data => {
    this.collection = data
  } );
}

    ngOnInit() {
  
      if (this.router.url.indexOf('edit') > -1) {
        this.editPage = true;
        this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
        if (this.collectionRef) {
            this.getCollection();
        }
      } else {
        this.editPage = false;
      }
    }

}
