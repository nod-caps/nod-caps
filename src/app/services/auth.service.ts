import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 isLoggedIn = false;

  constructor(
       // public firbaseAuth: AngularFireAuth,
        //private router: Router,
        //private alertCtrl: AlertController
  ) { }

  /*async signIn(email: string, password: string){
    await this.firbaseAuth.signInWithEmailAndPassword(email,password)
    .then(res => {
        this.isLoggedIn = true;
        this.router.navigateByUrl('/control');
    }, async (err) => {
            const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Error',
            message: err.message,
            buttons: ['OK']
          });
      
          await alert.present();
    })
  }

  logout() {
      this.firbaseAuth.signOut();
  }

  canActivate() {
    if(!this.isLoggedIn){
        //if not authenticated do something. e.g redirect to login  page
            this.router.navigateByUrl('/');
        }
        return this.isLoggedIn;
    }


*/
}