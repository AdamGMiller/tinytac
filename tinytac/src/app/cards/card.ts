import { Point } from '../model/point.model';

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

  play(point?: Point): void {
    // discard card
  }
}
