import { Injectable } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { TargetService } from '../services/target.service';
import { Hex } from '../util/hex';

@Injectable({
  providedIn: 'root',
})

// This service is available to all cards and provides a variety of helper functions
export class CardService {
  public currentTarget: Hex;

  constructor(
    private playerService: PlayerService,
    private targetService: TargetService
  ) {
    targetService.selectedHex$.subscribe(
      (target) => (this.currentTarget = target)
    );
  }

  playerHasEnoughEnergy(energyNeeded: number): boolean {
    return this.playerService.energy$.value >= energyNeeded;
  }
}
