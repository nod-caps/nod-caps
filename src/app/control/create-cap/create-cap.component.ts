import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';

@Component({
  selector: 'app-create-cap',
  templateUrl: './create-cap.component.html',
  styleUrls: ['./create-cap.component.scss'],
})
export class CreateCapComponent implements OnInit {
  cap: any;
  capRef: any;

public editPage = false;

  constructor( private router: Router,
    private fb: FirebaseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

      capForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
     price: ['', [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$"), Validators.minLength(4)]]
  });

  get name() {
    return this.capForm.get('name');
  }

  get description() {
    return this.capForm.get('description');
  }

  get price() {
    return this.capForm.get('price');
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
    price: [
      { type: 'pattern', message: 'Numeric values only'},
      { type: 'minlength', message: 'Price must be longer than 3 characters'},
    ],
  }

goBack() {
this.router.navigateByUrl('control/collections');
}


getCap(){
  this.fb.getSingleCap(this.capRef).then(data => {
    this.cap = data
  });
}

  ngOnInit() {

    if (this.router.url.indexOf('edit') > -1) {
      this.editPage = true;
      const collectionRef = this.route.snapshot.paramMap.get('collectionRef');
      const capName = this.route.snapshot.paramMap.get('capNameHyphenated');
      this.capRef = collectionRef + '_' + capName;
 
    } else {
      this.editPage = false;
    }
  }

}
