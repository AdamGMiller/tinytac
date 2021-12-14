import { Point } from '../model/point.model';
import { Card } from './card';

export class CardStrike extends Card {
  tag = 'strike';
  name = 'Strike';
  description: 'Strike ';
  cost = 1;
  damage = 4;
  range = 1;

  constructor() {
    super();
  }

  canPlay(): boolean {
    return true;
  }

  play(point: Point): void {
    // get enemy at point and damage them

    super.play();
  }
}
