import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss'],
})
export class SectionOneComponent implements OnInit {

  constructor() { }



  checkOnScreen(){
    const section1 = document.querySelector('.section1');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('intersect1');
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove('intersect1');
        }
      });
    });
    
    observer.observe(section1);
    
  }
  




  ngOnInit() {
    this.checkOnScreen();

  }

  

}
