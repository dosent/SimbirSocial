import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { OsmMapComponent } from './osm-map/osm-map.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { NgxSidebarControlModule } from '@runette/ngx-leaflet-sidebar';
import { NgxLoadingControlModule } from '@runette/ngx-leaflet-loading';
import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    // NgxSidebarControlModule,
    NgxLoadingControlModule,
    NgxLeafletLocateModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
  ],
  declarations: [AppComponent, OsmMapComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
