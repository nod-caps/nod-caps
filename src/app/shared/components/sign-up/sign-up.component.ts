import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  @Input() orderNumber: any;
  @Input() inFooter = false;
  @Input() inBanner = false;
  @Input() fromPopUp = false;
  isChecked = false;
  sending = false;
  signedUp = false;
  @Output() justSignedUp: EventEmitter<any> = new EventEmitter;
  lostFocus = false;

  constructor(
    private formBuilder: FormBuilder,
    private fire: AngularFirestore,
    private cookie: CookieService,
    private toastCtrl: ToastController
  ) { }


  
  signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
  });


  get email() {
    return this.signUpForm.get('email');
  }

  public errorMessages = {
    email: [
      { type: 'pattern', message: 'Valid email required'},
    ],
  }

changeFocus() {
  this.lostFocus = true;
}
signUp () {
 let orderNumber = ""
 let customFields = {};
  if (this.orderNumber) {
     orderNumber =this.orderNumber;
      customFields = {
      e1_T: 'ask_review',
      e3_T: this.orderNumber
     }
  }


  if (this.signUpForm.get('email').value) {
    let randomUserNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
    const email = this.signUpForm.get('email').value.substring(0,4)
    for (let i = 0; i < 4; i++) {
      var randomLet = email.charAt(Math.floor(Math.random() * 4));
      var randomNum = Math.floor(Math.random() * 7);
      randomUserNumber = randomUserNumber.slice(0, randomNum) + randomLet + randomUserNumber.slice(randomNum);
    }  

    // to get the custom field id just look at network when you go to the custom fields section of sendgrid
   this.sending = true;
   this.fire
    .collection('contacts')
    .add({
      email: this.signUpForm.get('email').value,
      unique_name: randomUserNumber,
      custom_fields: customFields
    }).then(async (doc: any)=> {
      if (doc) {
         this.sending = false;
         this.signedUp = true;
         this.justSignedUp.emit(true);
         if (!this.inBanner) {
          this.presentToast('Thanks for signing up');
        }
  
      }
     });
  } else {
    this.presentToast('Please enter your email');

  }

}

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'tertiary',
    });
    toast.present();
  }

  ngOnInit() {
    const gotConsentCookie =  this.cookie.get('consentAllowed');
    if (gotConsentCookie === 'allowed') {
      this.cookie.set('shownPopUp', 'shown', 365); 
    }
  }

}
