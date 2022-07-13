import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {

  capReviews: any;
  @Input() cap: any;
  currentSegment = 'cap';
  loadedOtherOnce = false;
  otherReviews: any;
  loadingCapReviews = true;
  loadingOtherReviews = true
  @Input() wholeStars = 5;
  @Input() hasHalf = false;

  reviewSkeleton = [1,2,3];

  constructor(
    private firestore: Firestore
  ) { }

  segmentChanged(event: any){
    this.currentSegment= event.detail.value;
    if (this.currentSegment === 'other' && !this.loadedOtherOnce){
      this.loadOtherReviews();
      this.loadedOtherOnce = true;
    }
  }


  async getCapReviews(){
    this.capReviews = [];
    const q = query(collection(this.firestore, 'reviews'), where("capRef", "==", this.cap.capRef));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.capReviews.push(doc.data());
    });
    this.loadingCapReviews = false;
  }

  async loadOtherReviews(){
    this.otherReviews = [];
    const q = query(collection(this.firestore, 'reviews'), where("capRef", "!=", this.cap.capRef));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.otherReviews.push(doc.data());
    });
    this.loadingOtherReviews = false;

  }

  ngOnInit() {
    this.getCapReviews();
  }

}
