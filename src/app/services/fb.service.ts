import { Injectable } from '@angular/core';
import { collection, query, getDocs, where, Firestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  allCaps: any[] = [];
  currentDoc: any;

  constructor(
    private firestore: Firestore,
  ) { }

  async getSingleCollection(collectionRef?: any){
    const collections = [];
        const q = query(collection(this.firestore, 'collections'), where("collectionRef", "==", collectionRef));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          collections.push(doc.data());
        });
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


    async getAllCaps(){
      this.allCaps = [];
      const q = query(collection(this.firestore, 'collections'), where("isLive", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const qu = query(collection(this.firestore, 'caps'), where("collectionRef", "==", doc.data().collectionRef));
        const querySnapshot = await getDocs(qu);
        const capList=[]
        const collectionObj  = {name: doc.data().name, collectionRef: doc.data().collectionRef, capList};
        querySnapshot.forEach((doc) => {
         capList.push(doc.data());
      });
      this.allCaps.push(collectionObj);
    });
    return this.allCaps;
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
    const q = query(collection(this.firestore, 'caps'), where("capRef", "==", capRef));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      caps.push(doc.data());
    });
    return caps[0]
}

async getStripeCap(capRef:any) {
  const stripeCaps = [];
  const q = query(collection(this.firestore, 'products'), where("metadata.id", "==", capRef));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    stripeCaps.push(doc.data());
    const q1 = query(collection(doc.ref, 'prices'));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (doc1) => {
      stripeCaps[0].price = doc1.data()
      console.log('shalom')
      return stripeCaps[0]
    });
  });
}





}
