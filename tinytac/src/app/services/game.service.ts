import { Injectable } from '@angular/core';
import { MapService } from '../map/map.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private mapService: MapService,
    private playerService: PlayerService
  ) {}

  public start(map: string): void {
    // normally we'd start in a neutral encounter area, but for now
    // just jump to combat

    this.mapService.setMap('start');
  }
}
