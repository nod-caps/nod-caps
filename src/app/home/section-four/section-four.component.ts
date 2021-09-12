import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-four',
  templateUrl: './section-four.component.html',
  styleUrls: ['./section-four.component.scss'],
})
export class SectionFourComponent implements OnInit {

  constructor() { }

 

  checkOnScreen(){
    const section2 = document.querySelector('.section4');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('intersect4');
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove('intersect4');
        }
      });
    });
    
    observer.observe(section2);
    
  }
  




  ngOnInit() {
    this.checkOnScreen();

  }

}

