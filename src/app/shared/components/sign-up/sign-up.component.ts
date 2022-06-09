import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  @Input() inModal = true;
  isChecked = false;
  sending = false;
  signedUp = false;

  constructor(
    private formBuilder: FormBuilder,
    private fire: AngularFirestore
  ) { }


  
  signUpForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
  });

  

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  public errorMessages = {
    name: [
      { type: 'maxlength', message: 'Name cant be longer than 20 characters'},
      { type: 'minlength', message: 'Name must be longer than 3 characters'},
    ],
    email: [
      { type: 'pattern', message: 'Valid email required'},
    ],
  }


signUp () {
 let ask_review = "";
  if (!this.inModal) {
    ask_review = 'ask_review';
  }
  const fullName = this.signUpForm.get('name').value.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
  this.sending = true;
  this.fire
  .collection('contacts')
  .add({
    email: this.signUpForm.get('email').value,
    first_name: firstName,
    last_name: lastName,
    line: ask_review
  }).then(async (doc: any)=> {
    if (doc) {
       this.sending = false;
       this.signedUp = true;
    }
   });
}

  ngOnInit() {
  }

}
