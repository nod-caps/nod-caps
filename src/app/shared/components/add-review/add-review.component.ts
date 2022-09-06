import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { getFunctions, httpsCallable } from 'firebase/functions';

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
 //  @Input() email: any;
  @Input() order: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private fire: AngularFirestore,
    private toastCtrl: ToastController
  ) { }

  reviewForm = this.formBuilder.group({
    name: ['', [ Validators.maxLength(20)]],
    message: ['', [ Validators.maxLength(200)]],
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
            image: this.cap.imageField1Mobile,
            capName: this.cap.name,
            date: new Date().toISOString().split("T")[0],
            orderNumber: this.order.orderNumber,
            collectionRef: this.cap.collectionRef,
            link: this.cap.collectionRef + '/' + this.cap.nameHyphenated
          }
      
      this.fire.collection('reviews').add(reviewObj).then(async (doc: any)=> {
        if (doc) {
          const toast = await this.toastCtrl.create({
            message: 'Thanks for leaving a review!',
            duration: 2000,
            position: 'top',
            color: 'tertiary',
          });
          toast.present();
           this.sending = false;
           this.modalCtrl.dismiss({review: true});
           const functions = getFunctions();
           const updateReviews = httpsCallable(functions, 'updateAverageReview');
           updateReviews({capRef: this.cap.capRef, newRating: this.selectedIndex}).then((result) => {
            if (result) {
              this.sendMail();
            }
          }).catch((err) => {
            console.log(err.message);
          });
        }
       });
      
  }

  sendMail() {
    const contactObj = {
      to: "info@nodcaps.com",
      message: {
        subject: "New Review",
        text: this.cap.capRef,
        // email: this.email,
        html: "<ul><li>" +  this.reviewForm.get('name').value + " </li><li>" +  this.selectedIndex + "stars </li><li>" +  this.reviewForm.get('message').value + "</li><li>www.nodcaps.com/shop/" + this.cap.collectionRef + "/" + this.cap.nameHyphenated  + "</li></ul>",
      },
  }
  this.fire.collection('mail').add(contactObj);
  }


  highlight(index: number) {
    this.highlightIndex = index + 1;
  }

  dehighlight() {
    this.highlightIndex = -1;
  }

  ngOnInit() {
    this.reviewForm.get('name').setValue(this.order.customerName)
  }

}
