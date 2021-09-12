import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-section-three',
  templateUrl: './section-three.component.html',
  styleUrls: ['./section-three.component.scss'],
})
export class SectionThreeComponent implements OnInit {

  constructor() { }




  checkOnScreen(){
    const section2 = document.querySelector('.section3');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('intersect3');
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove('intersect3');
        }
      });
    });
    
    observer.observe(section2);
    
  }
  
  ngOnInit() {
    this.checkOnScreen();

  }

  

}
