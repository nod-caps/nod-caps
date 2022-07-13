import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cap-display',
  templateUrl: './cap-display.component.html',
  styleUrls: ['./cap-display.component.scss'],
})
export class CapDisplayComponent implements OnInit {

@Input() capArray = [];
@Input() parentCapName = '';

  constructor() { }

  ngOnInit() {}

}
