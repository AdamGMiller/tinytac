import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hex } from '../util/hex';

@Injectable({
  providedIn: 'root',
})
export class TargetService {
  public selectedHex$: BehaviorSubject<Hex> = new BehaviorSubject<Hex>(null);

  constructor() {}

  public clearSelectedHex(): void {
    this.selectedHex$.next(null);
  }
}
