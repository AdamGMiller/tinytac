import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { Card } from '../cards/card';
import { CardFactoryService } from '../cards/card-factory.service';
import { Character } from '../model/character.model';
import { TargetService } from '../services/target.service';
import { Hex } from '../util/hex';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private targetService: TargetService) {}

  deck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  hand$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  discard$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  _deck: Card[] = [];
  _hand: Card[] = [];
  _discard: Card[] = [];

  loadDeckFromCharacter(
    character: Character,
    cardFactoryService: CardFactoryService
  ) {
    character.deck.forEach((cardTag) => {
      const card = cardFactoryService.createCard(cardTag);
      this._deck.push(card);
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

  selectCardToPlay(index: number): void {
    const card = this._hand[index];
    console.log('select card to play', card);

    const targetTypes = card.allowedTargets();
    // if card doesn't require a target, just play it
    // see if card requires target, if so, start looking for target
    // have target service report back when a target is selected
    // finish playing card

    this.targetService.clearSelectedHex();
    this.targetService.selectedHex$
      .pipe(
        skipWhile((hex: Hex) => hex == null),
        take(1)
      )
      .subscribe((hex: Hex) => {
        console.log('selecting hex', hex);
        this.playCard(index, hex);
      });
  }

  playCard(index: number, target: Hex): void {
    this._hand[index].play();

    // either discard the card or if the card is on-time, just remove it completely
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

  private getCardFromIndex(index: number): Card {
    return this._hand[index];
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
