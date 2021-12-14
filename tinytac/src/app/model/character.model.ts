import { AbstractMesh } from '@babylonjs/core';
import { Card } from '../cards/card';
import { Hex } from '../util/hex';

export class Character {
  model: string;

  meshes?: AbstractMesh[];

  // tags of cards in full deck
  deck: string[];

  // draw and discard pile contain tags only,
  // while hand contains full card objects
  draw?: string[];
  discard?: string[];
  hand?: Card[];

  // current location
  hex?: Hex;
}
