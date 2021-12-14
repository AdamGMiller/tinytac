import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterOption } from '../model/character-option.model';
import { Character } from '../model/character.model';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterOptionService {
  public characterOptions: BehaviorSubject<CharacterOption[]> =
    new BehaviorSubject<CharacterOption[]>([]);

  constructor(
    private playerService: PlayerService,
    private httpClient: HttpClient
  ) {
    this.loadCharacterOptions();
  }

  public selectCharacterOption(characterOption: CharacterOption) {
    // TODO: Try and get model with fallback to alt model
    const character: Character = {
      model: characterOption.model,
      deck: characterOption.deck,
    };
    console.log('adding character', character);
    this.playerService.characters.push(character);
  }

  private loadCharacterOptions() {
    this.httpClient
      .get(`assets/data/character-options.json`)
      .subscribe((result: CharacterOption[]) => {
        this.characterOptions.next(result);
      });
  }
}
