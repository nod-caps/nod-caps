import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-section-two',
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss'],
})
export class SectionTwoComponent implements OnInit {

  constructor() { }



  checkOnScreen(){
    const section2 = document.querySelector('.section2');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('intersect2');
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove('intersect2');
        }
      });
    });
    
    observer.observe(section2);
    
  }
  




  ngOnInit() {
    this.checkOnScreen();

  }

  

}
