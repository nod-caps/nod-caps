import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {

  stars = [1,2,3,4,5]
  highlightIndex = -1;
  rating: number;
  @Input() cap: any;
  selectedIndex: any;
  sending = false

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private fire: AngularFirestore
  ) { }

  reviewForm = this.formBuilder.group({
    name: ['', [ Validators.maxLength(20)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
  });

  

  get name() {
    return this.reviewForm.get('name');
  }

  get message() {
    return this.reviewForm.get('message');
  }

  public errorMessages = {
    name: [
      { type: 'maxlength', message: 'Name cant be longer than 20 characters'},
    ],
    message: [
      { type: 'maxlength', message: 'Description cant be longer than 200 characters'},
      { type: 'minlength', message: 'Description must be longer than 10 characters'},
    ],
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }


  selectRating(index: number) {
    this.rating = index + 1;
    this.selectedIndex = this.rating;
  }

  addReview(){
      this.sending = true;
      const reviewObj = {
          name: this.reviewForm.get('name').value,
            message: this.reviewForm.get('message').value,
            capRef: this.cap.capRef,
            rating: this.selectedIndex,
            image: this.cap.imageField1,
            capName: this.cap.name
          }
      
      this.fire.collection('reviews').add(reviewObj).then(async (doc: any)=> {
        if (doc) {
           this.sending = false;
           this.modalCtrl.dismiss({review: true});
        }
       });
      
  }


  highlight(index: number) {
    this.highlightIndex = index + 1;
  }

  dehighlight() {
    this.highlightIndex = -1;
  }

  ngOnInit() {}

}
