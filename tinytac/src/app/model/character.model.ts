import { AbstractMesh } from '@babylonjs/core';
import { Hex } from '../util/hex';

export class Character {
  model: string;

  meshes?: AbstractMesh[];

  // tags of cards in full deck
  deck: string[];

  // current location
  hex?: Hex;
}
