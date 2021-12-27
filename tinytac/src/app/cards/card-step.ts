import { Card } from './card';
import { CardService } from './card.service';

export class CardStep extends Card {
  tag = 'step';
  name = 'Quick step';
  description: 'Take a step in any direction.';
  cost = 0;

  constructor(cardService: CardService) {
    super(cardService);
  }

  canPlay(): boolean {
    return true;
  }

  play(): void {
    // move player to hex point
    console.log('playing step');

    super.play();
  }
}
