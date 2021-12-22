import { Point } from '../model/point.model';
import { TargetType } from './target-type.enum';

export class Card {
  tag: string;
  name: string;
  description: string;
  cost: number;
  range?: number;
  damage?: number;

  canPlay(): boolean {
    return true;
  }

  allowedTargets(): TargetType[] {
    return [TargetType.enemy, TargetType.hex, TargetType.player];
  }

  isTargetValid(): boolean {
    return true;
  }

  play(point?: Point): void {
    // discard card
  }
}
