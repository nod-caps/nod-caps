import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/fb.service';
import { AlertController, ToastController } from '@ionic/angular';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss'],
})
export class CreateCollectionComponent implements OnInit {


  public editPage = false;
  collectionRef: any;
  collection: any;
  saving = false;
  docRef: any;
  bannerImage: any;
  putLive = false;
  hasProcessed = false;

  constructor( private router: Router,
    private route: ActivatedRoute,
    private fb: FirebaseService,
    private formBuilder: FormBuilder,
    private fire: AngularFirestore, 
    private toast: ToastController,
    private alert: AlertController) { }

   
  collectionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
  });


  onChange(event: any) {
    if (event.detail.checked) {
      this.putLive = true;
    } else {
      this.putLive = false;
    }
  }


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


  processFile(imageInput: any) {
      this.hasProcessed = true;
      this.bannerImage = imageInput.files[0];
  }
 

  async save() {
    this.saving = true;
    const name = this.collectionForm.get('name').value;
    const description = this.collectionForm.get('description').value;
    this.docRef = 'collections-' + name.replaceAll(' ', '-');
    this.collectionRef = name.replaceAll(' ', '-');

    const collectionObj = {
      name: name,
      description: description,
      collectionRef: this.collectionRef,
      isLive: this.putLive
    };
    if (!this.editPage) {
    // Add a new document in collection "cities" with ID 'LA'
    const res = await this.fire.collection('collections').doc(this.docRef).set(collectionObj).then(async (doc: any)=> {
      this.storeBannerImage();
      let toast = await this.toast.create({
         message: "Collection Added!",
         duration: 3000,
         position: "top",
       })
        toast.present();
        this.saving = false
        this.collectionForm.reset();
    
    });
    } else {
    // Add a new document in collection "cities" with ID 'LA'
    const res = await this.fire.collection('collections').doc(this.docRef).update(collectionObj).then(async (doc: any)=> {
      if (this.hasProcessed) {
        this.storeBannerImage();
      }
       let toast = await this.toast.create({
         message: "Collection Updated!",
         duration: 3000,
         position: "top",
       })
        toast.present();
        this.saving = false    
    });
    }

  }


  

  storeBannerImage() {
      const storage = getStorage();
    
      
          
          const loc = 'images/collections/' + this.collectionRef + '.jpg';
          const storageRef = ref(storage, loc);
        // Create file metadata including the content type
        /** @type {any} */
        const metadata = {
          contentType: 'image/jpeg',
        };
        // Upload the file and metadata
        const uploadTask = uploadBytes(storageRef, this.bannerImage, metadata).then((snapshot: any) => {
          const storage = getStorage();
          getDownloadURL(ref(storage, snapshot.metadata.fullPath))
          .then(async (url) => {
            const ref = this.fire.collection('collections').doc(this.docRef);
            const res = await ref.update({imageUrl: url});
          })
        });
        
      }
       

  async remove(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Remove?',
      subHeader: 'Are you sure you want to remove this collection?',
      message: 'This is a permanent change.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          handler: async () => {
            const res = await this.fire.collection('collections').doc(this.docRef).delete().then(async (doc: any)=> {
              this.router.navigateByUrl('control/collections');
            });
        

          }
        }
      ]    });

    await alert.present();
}

  goBack() {
  this.router.navigateByUrl('control/collections');
  }
  
getCollection() {
  this.fb.getSingleCollection(this.collectionRef).then(data => {
    this.collection = data
    this.collectionForm.get('name').setValue(this.collection.name);
    this.collectionForm.get('description').setValue(this.collection.description);
      this.putLive = this.collection.isLive
  });
}

    ngOnInit() {
  
      if (this.router.url.indexOf('edit') > -1) {
        this.editPage = true;
        this.collectionRef = this.route.snapshot.paramMap.get('collectionRef');
        this.docRef = 'collections-' +this.collectionRef;
        if (this.collectionRef) {
            this.getCollection();
        }
      } else {
        this.editPage = false;
      }
    }

}
