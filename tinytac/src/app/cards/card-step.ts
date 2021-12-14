import { Point } from '../model/point.model';
import { Card } from './card';

export class CardStep extends Card {
  tag = 'step';
  name = 'Quick step';
  description: 'Take a step in any direction.';
  cost = 0;

  constructor() {
    super();
  }

  canPlay(): boolean {
    return true;
  }

  play(point: Point): void {
    // move player to hex point

    super.play();
  }
}
