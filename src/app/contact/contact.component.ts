import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  mailSent = false;
  sending = false;

  constructor(
    private formBuilder: FormBuilder,
    private fire: AngularFirestore, 
    private seo: SeoService

  ) { }

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
  });

  

  get name() {
    return this.contactForm.get('name');
  }

  get message() {
    return this.contactForm.get('message');
  }

  get email() {
    return this.contactForm.get('email');
  }

  public errorMessages = {
    name: [
      { type: 'maxlength', message: 'Name cant be longer than 20 characters'},
      { type: 'minlength', message: 'Name must be longer than 3 characters'},
    ],
    message: [
      { type: 'maxlength', message: 'Description cant be longer than 200 characters'},
      { type: 'minlength', message: 'Description must be longer than 10 characters'},
    ],

    email: [
      { type: 'pattern', message: 'Valid email required'},
    ],
  }



  sendEmail() {
    this.sending = true;
    const contactObj = {
        to: "info@nodcaps.com",
        message: {
          subject: "Contact Form!",
          text: this.contactForm.get('message').value,
          html: "<ul><li>" +  this.contactForm.get('name').value + "</li><li>" +  this.contactForm.get('email').value + "</li><li>" + this.contactForm.get('message').value  + "</li></ul>",
        },
    }
    this.fire.collection('mail').add(contactObj).then(async (doc: any)=> {
      if (doc) {
         this.sending = false;
         this.mailSent = true;
      }
     });
    }

  ngOnInit() {
    this.seo.generateTags({title: 'Contact Us - UK Baseball Caps | nod caps', description:'Contact nod caps for help with returns, orders, product queries and more.' });

  }

}
