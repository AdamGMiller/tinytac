import { CardService } from './card.service';
import { TargetType } from './target-type.enum';

export class Card {
  tag: string;
  name: string;
  description: string;
  cost: number;
  range?: number;
  damage?: number;

  constructor(private cardService: CardService) {}

  canPlay(): boolean {
    // can player pay the energy cost?
    if (!this.cardService.playerHasEnoughEnergy) {
      return false;
    }

    return true;
  }

  allowedTargets(): TargetType[] {
    return [TargetType.enemy, TargetType.hex, TargetType.player];
  }

  isTargetValid(): boolean {
    return true;
  }

  play(): void {
    // discard card
  }
}
