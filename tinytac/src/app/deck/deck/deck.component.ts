import { Component, OnInit } from '@angular/core';
import { CombatService } from 'src/app/services/combat.service';
import { DeckService } from '../deck.service';

@Component({
  selector: 'tt-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  constructor(
    public deckService: DeckService,
    public combatService: CombatService
  ) {}

  ngOnInit(): void {}

  select(selected: boolean, index: number) {
    this.deckService.selectCardToPlay(index);
  }
}
