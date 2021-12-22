import { Injectable } from '@angular/core';
import { Card } from './card';
import { CardStep } from './card-step';
import { CardStrike } from './card-strike';

@Injectable({
  providedIn: 'root',
})
export class CardFactoryService {
  constructor() {}

  createCard(card: string): Card {
    switch (card) {
      case 'step':
        return new CardStep();
      case 'strike':
        return new CardStrike();

      case 'default': {
        console.log(card + ' is not a valid card');
      }
    }
  }
}
