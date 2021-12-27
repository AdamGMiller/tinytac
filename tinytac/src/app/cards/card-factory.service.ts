import { Injectable } from '@angular/core';
import { Card } from './card';
import { CardStep } from './card-step';
import { CardStrike } from './card-strike';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class CardFactoryService {
  constructor(private cardService: CardService) {}

  createCard(card: string): Card {
    switch (card) {
      case 'step':
        return new CardStep(this.cardService);
      case 'strike':
        return new CardStrike(this.cardService);

      case 'default': {
        console.log(card + ' is not a valid card');
      }
    }
  }
}
