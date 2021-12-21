import { Component, OnInit } from '@angular/core';
import { skipWhile } from 'rxjs/operators';
import { CharacterOptionService } from './services/character-option.service';
import { CombatService } from './services/combat.service';
import { GameService } from './services/game.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tinytac';

  constructor(
    private characterOptionService: CharacterOptionService,
    private gameService: GameService,
    private combatService: CombatService
  ) {}

  public ngOnInit(): void {
    // TODO: Add ability to pick character
    this.characterOptionService.characterOptions
      .pipe(skipWhile((option) => option.length == 0))
      .subscribe((options) => {
        const option = options[0];
        console.log(option);
        this.characterOptionService.selectCharacterOption(option);

        this.gameService.start(option.map);
      });
  }
}
