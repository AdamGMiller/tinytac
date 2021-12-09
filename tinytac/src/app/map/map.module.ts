import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map.router.module';

@NgModule({
  imports: [CommonModule, FormsModule, MapRoutingModule],
  declarations: [MapComponent],
  providers: []
})
export class MapModule {}
