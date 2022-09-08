import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() titleCard = ''; // decorate the property with @Input()
  @Input() widthPercentage = 50;
  constructor() { }

  ngOnInit(): void {
  }

}
