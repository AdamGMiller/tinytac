import { Injectable } from '@angular/core';
import { Character } from '../model/character.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // just a single character for now, but allow for more later
  characters: Character[] = [];
  currentCharacterIndex = 0;

  get character(): Character {
    return this.characters[this.currentCharacterIndex];
  }

  constructor() {}
}
