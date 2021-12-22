import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/cards/card';

@Component({
  selector: 'tt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public card: Card;
  constructor() {}

  ngOnInit(): void {}
}
