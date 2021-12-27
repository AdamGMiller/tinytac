import { Card } from './card';
import { CardService } from './card.service';

export class CardStrike extends Card {
  tag = 'strike';
  name = 'Strike';
  description: 'Strike ';
  cost = 1;
  damage = 4;
  range = 1;

  constructor(cardService: CardService) {
    super(cardService);
  }

  canPlay(): boolean {
    return true;
  }

  play(): void {
    // get enemy at point and damage them

    super.play();
  }
}
