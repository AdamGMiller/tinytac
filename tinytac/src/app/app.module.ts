import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandComponent } from './deck/hand/hand.component';
import { CardComponent } from './deck/card/card.component';
import { DrawComponent } from './deck/draw/draw.component';
import { DiscardComponent } from './deck/discard/discard.component';
import { DeckComponent } from './deck/deck/deck.component';

@NgModule({
  declarations: [AppComponent, HandComponent, CardComponent, DrawComponent, DiscardComponent, DeckComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
