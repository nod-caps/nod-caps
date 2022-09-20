import { Component, OnInit } from '@angular/core';
import { QuickCapService } from 'src/app/services/quick-cap.service';

@Component({
  selector: 'app-top-caps',
  templateUrl: './top-caps.component.html',
  styleUrls: ['../cap-card/cap-card.component.scss'],
})
export class TopCapsComponent implements OnInit {

  constructor(
    private quickCap: QuickCapService
  ) { }


  ngOnInit() {
  }

} 
