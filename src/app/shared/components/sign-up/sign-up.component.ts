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

  @Input() fromThankYou = false;
  @Input() inFooter = false;
  @Input() inBanner = false;
  isChecked = false;
  sending = false;
  signedUp = false;
  @Output() justSignedUp: EventEmitter<any> = new EventEmitter;

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


signUp () {
 let ask_review = "";
  if (this.fromThankYou) {
    ask_review = 'ask_review';
  }


  if (this.signUpForm.get('email').value) {
    const randomUserNumber = Math.floor(100000 + Math.random() * 900000).toString();
    this.sending = true;
    this.fire
    .collection('contacts')
    .add({
      email: this.signUpForm.get('email').value,
      line: ask_review,
      unique_name: randomUserNumber,
    }).then(async (doc: any)=> {
      if (doc) {
         this.sending = false;
         this.signedUp = true;
         this.justSignedUp.emit(true);
         if (!this.inBanner) {
          this.presentToast('Thanks for signing up!.');
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
