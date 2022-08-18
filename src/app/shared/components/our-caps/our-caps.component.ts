import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-caps',
  templateUrl: './our-caps.component.html',
  styleUrls: ['./our-caps.component.scss'],
})
export class OurCapsComponent implements OnInit {

  @Input() dark= true;
  @Input() shopPage = false;

  constructor() { }

  ngOnInit() {}

}
