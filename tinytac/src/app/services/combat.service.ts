import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardFactoryService } from '../cards/card-factory.service';
import { DeckService } from '../deck/deck.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  public state: BehaviorSubject<'initializing' | 'player' | 'enemy'> =
    new BehaviorSubject<'initializing' | 'player' | 'enemy'>('initializing');

  constructor(
    private deckService: DeckService,
    private cardFactoryService: CardFactoryService,
    private playerService: PlayerService
  ) {}

  startCombat(): void {
    console.log('starting combat');
    this.state.next('initializing');

    // set the deck
    this.deckService.loadDeckFromCharacter(
      this.playerService.character,
      this.cardFactoryService
    );

    // spawn enemies

    // start turn
    this.playerTurnStart();
  }

  playerTurnStart(): void {
    this.state.next('player');
    this.playerService.energy$.next(this.playerService.maximumEnergy$.value);
    this.deckService.drawHand(5);
  }

  playerTurnEnd(): void {
    // discard cards
    // cycle through enemy turns
  }

  enemyTurn(): void {
    this.state.next('enemy');
    // cycle through each enemy
  }
}
