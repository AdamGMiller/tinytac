import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'fb-scene',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  constructor(private mapService: MapService) {}

  @ViewChild('rCanvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.mapService.createScene(this.canvasRef);
    this.mapService.start();
  }
}
