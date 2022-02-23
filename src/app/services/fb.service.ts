import { Injectable } from '@angular/core';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    private firestore: Firestore

  ) { }

  async getSingleCollection(collectionRef?: any){
    const collections = [];
        const q = query(collection(this.firestore, 'collections'), where("collectionRef", "==", collectionRef));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          collections.push(doc.data());
        });
        console.log('hello', collections);
        return collections[0];

}



    async getCollections(collectionRef?: any){
        const collections = [];
       
            const q = query(collection(this.firestore, 'collections'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                collections.push(doc.data());
            });
            return collections

    }


    async getCollectionCaps(collectionRef: any){
    const caps = [];
    const q = query(collection(this.firestore, 'caps'), where("collectionRef", "==", collectionRef));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      caps.push(doc.data());
    });
    return caps
}

async getSingleCap(capRef: any){
    const caps = [];
    const q = query(collection(this.firestore, 'caps'), where("cap_reference", "==", capRef));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      caps.push(doc.data());
    });
    return caps[0]
}




}
