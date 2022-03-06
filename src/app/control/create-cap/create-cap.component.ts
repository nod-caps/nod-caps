import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseService } from 'src/app/services/fb.service';


@Component({
  selector: 'app-create-cap',
  templateUrl: './create-cap.component.html',
  styleUrls: ['./create-cap.component.scss'],
})
export class CreateCapComponent implements OnInit {
  cap: any;
  capRef: any;
  capNameHyp: any;
  collectionRef: any;
  hasProcessed = false;
  capName: any;
public editPage = false;

imageArr: any[] = [{
  file: '',
  capNumber: 1,
  hasProcessed: false
 
},{
  file: '',
  capNumber: 2,
  hasProcessed: false
},{
  file: '',
  capNumber: 3,
  hasProcessed: false
},{
  file: '',
  capNumber: 4,
  hasProcessed: false
}];
saving = false;
  constructor( private router: Router,
    private fb: FirebaseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fire: AngularFirestore,
    private toast: ToastController,
    private alert: AlertController
    ) { }

      capForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
     price: ['', [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$"), Validators.minLength(4)]],
     quantity: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]

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

  get quantity() {
    return this.capForm.get('quantity');
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
    quantity: [
      { type: 'pattern', message: 'Numeric values only'},
    ],
  }

goBack() {
this.router.navigateByUrl('control/collections');
}


getCap(){
  this.fb.getSingleCap(this.capRef).then(async data => {
    this.cap = data
    if (this.cap) {
      this.setValues();
    } else {
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'No Cap Found',
        message: 'We could find no cap at this URL please go back and try again.',
        buttons: [
          {
            text: 'Okay',
            handler: async () => {
             
                this.router.navigateByUrl('control/collections');
            }
          }
        ]   
       });
  
      await alert.present();
    }
  });
}

setValues() {
  this.capForm.get('name').setValue(this.cap.name);
  this.capForm.get('description').setValue(this.cap.description);
  this.capForm.get('price').setValue(this.cap.price);
  this.capForm.get('quantity').setValue(this.cap.quantity);



}


processFile(imageInput: any, capNumber: number) {
  this.hasProcessed = true;
  if (capNumber === 1) {
    this.imageArr[0].file = imageInput.files[0];
    this.imageArr[0].hasProcessed = true;
  } else if (capNumber === 2) {
    this.imageArr[1].file = imageInput.files[0];
    this.imageArr[1].hasProcessed = true;
  } else if (capNumber === 3) {
    this.imageArr[2].file = imageInput.files[0];
    this.imageArr[2].hasProcessed = true;
  } else if (capNumber === 4) {
    this.imageArr[3].file = imageInput.files[0];
    this.imageArr[3].hasProcessed = true;

  }
}

  async removeCap(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Remove?',
      subHeader: 'Are you sure you want to remove this cap?',
      message: 'This is a permanent change.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          handler: async () => {
            const res = await this.fire.collection('caps').doc(this.capRef).delete().then(async (doc: any)=> {
              this.router.navigateByUrl('control/collections');
            });
        

          }
        }
      ]    });

    await alert.present();
}

async save() {
  this.saving = true;
  this.capName = this.capForm.get('name').value;
  const description = this.capForm.get('description').value;
  const price = this.capForm.get('price').value;
  const quantity = this.capForm.get('quantity').value;
  this.capRef = this.collectionRef + '_' + this.capName.replaceAll(' ', '-');

  const capObj = {
    name: this.capName,
    description: description,
    collectionRef: this.collectionRef,
    collection: this.collectionRef.replaceAll('-', ' '),
    capRef: this.capRef,
    nameHyphenated: this.capName.replaceAll(' ', '-'),
    price: price,
    quantity: quantity,
    isLive: false
  };
  if (this.editPage) {
    const res = await this.fire.collection('caps').doc(this.capRef).update(capObj).then(async (doc: any)=> {
      if (this.hasProcessed) {
        this.storeImages();
      }
       let toast = await this.toast.create({
         message: "Cap Edited!",
         duration: 3000,
         position: "top",
       })
        toast.present();
        this.saving = false
    });
  } else {
    const res = await this.fire.collection('caps').doc(this.capRef).set(capObj).then(async (doc: any)=> {
      this.storeImages();
       let toast = await this.toast.create({
         message: "Cap Added!",
         duration: 3000,
         position: "top",
       })
        toast.present();
        this.saving = false
        this.capForm.reset();
 
      });
  }
 
}

storeImages() {
  const storage = getStorage();

  this.imageArr.forEach(img => {
    if (img.hasProcessed) {

      const loc = 'images/caps/' + this.collectionRef + '/' + this.capName.replaceAll(' ', '-') + '-' + img.capNumber + '.jpg';
      
      const storageRef = ref(storage, loc);

    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };
    // Upload the file and metadata
    const uploadTask = uploadBytes(storageRef, img.file, metadata).then((snapshot: any) => {
      const storage = getStorage();
      getDownloadURL(ref(storage, snapshot.metadata.fullPath))
      .then(async (url) => {
        const ref = this.fire.collection('caps').doc(this.capRef);
        if (img.capNumber === 1) {
          const imageFieldObj = {imageField1 : url }
          const res = await ref.update(imageFieldObj);
        } else if (img.capNumber === 2) {
          const imageFieldObj = {imageField2 : url }
          const res = await ref.update(imageFieldObj);
        } else if (img.capNumber === 3) {
          const imageFieldObj = {imageField3 : url }
          const res = await ref.update(imageFieldObj);
        } else if (img.capNumber === 4) {
          const imageFieldObj = {imageField4 : url }
          const res = await ref.update(imageFieldObj);
        }

       
        
      });
    });
    }
   
  });
}

  ngOnInit() {
    this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');

    if (this.router.url.indexOf('edit') > -1) {
      this.editPage = true;
      this.capNameHyp = this.route.snapshot.paramMap.get('capNameHyphenated');
      this.capRef = this.collectionRef + '_' + this.capNameHyp;
      this.getCap();
    } else {
      this.editPage = false;
    }
  }

}
