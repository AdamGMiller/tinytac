import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../cards/card';
import { CardFactoryService } from '../cards/card-factory.service';
import { Character } from '../model/character.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private cardFactoryService: CardFactoryService) {}

  deck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  hand$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  discard$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  _deck: Card[] = [];
  _hand: Card[] = [];
  _discard: Card[] = [];

  loadDeckFromCharacter(character: Character) {
    character.deck.forEach((card) => {
      this._deck.push(this.cardFactoryService.createCard(card));
    });
    this.shuffleDeck();
  }

  shuffleDeck(): void {
    this._deck = this.shuffle(this._deck);
    this.updateObservables();
  }

  drawHand(handSize: number): void {
    for (let index = 0; index < handSize; index++) {
      this.drawCard();
    }
  }

  discardHand(): void {
    for (let index = 0; index < this._hand.length; index++) {
      this.discardCard(index);
    }
  }

  discardCard(index: number): void {
    this._discard.push(this._hand[index]);
    this._hand.splice(index, 1);

    this.updateObservables();
  }

  playCard(index: number): void {
    this._hand[index].play();
    this.discardCard(index);
  }

  canPlayCard(index: number): boolean {
    return this._hand[index].canPlay();
  }

  drawCard(): void {
    if (this._deck.length === 0 && this._discard.length === 0) {
      console.log('Out of cards');
      return;
    }

    if (this._deck.length === 0) {
      this.moveDiscardIntoDeckAndShuffle();
    }
    this._hand.push(this._deck[0]);
    this._deck.splice(0, 1);
    this.updateObservables();
  }

  private moveDiscardIntoDeckAndShuffle(): void {
    for (let index = 0; index < this._discard.length; index++) {
      this._deck.push(this._discard[index]);
    }
    this._discard = [];
    this.shuffleDeck();
    this.updateObservables();
  }

  private updateObservables(): void {
    this.deck$.next(this._deck);
    this.hand$.next(this._hand);
    this.discard$.next(this._discard);
  }

  // TODO: Add a seed value
  private shuffle(cards: Card[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
