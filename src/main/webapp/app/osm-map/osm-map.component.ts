/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types='leaflet-sidebar-v2' />
/// <reference types='leaflet-loading' />
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, MapOptions, LoadingOptions, LeafletEvent } from 'leaflet';

declare module 'leaflet' {
  interface Control {
    _addTo(map: Map): Control;
  }
  interface Map {
    _leaflet_id: number;
    _container: HTMLElement;
  }
}

@Component({
  selector: 'jhi-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.scss'],
})
export class OsmMapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input()
  options!: MapOptions;
  public map!: Map;
  public loadingOptions: LoadingOptions = {
    position: 'topleft',
  };
  private zoom!: number;

  constructor() {}

  ngOnInit() {
    // Use a compact attribution control for small map container widths
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!Control.Attribution.prototype._addTo) {
      Control.Attribution.prototype._addTo = Control.Attribution.prototype.addTo;

      Control.Attribution.prototype.addTo = function (map) {
        Control.Attribution.prototype._addTo.call(this, map);

        // use the css checkbox hack to toggle the attribution
        const container = this.getContainer();
        const parent = container!.parentNode;
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const checkboxId = 'attribution-toggle-' + map._leaflet_id; // unique name if multiple maps are present

        checkbox.setAttribute('id', checkboxId);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('leaflet-compact-attribution-toggle');
        if (parent !== null) {
          parent.insertBefore(checkbox, parent.firstChild);

          label.setAttribute('for', checkboxId);
          label.classList.add('leaflet-control');
          label.classList.add('leaflet-compact-attribution-label');
          parent.appendChild(label);
        }
        // initial setup for map load
        // if (map._container.offsetWidth <= 600) {
        //   DomUtil.addClass(container as HTMLElement, 'leaflet-compact-attribution');
        // }

        // // update on map resize
        // map.on('resize', () => {
        //   if (map._container.offsetWidth > 600) {
        //     DomUtil.removeClass(container as HTMLElement, 'leaflet-compact-attribution');
        //   } else {
        //     DomUtil.addClass(container as HTMLElement, 'leaflet-compact-attribution');
        //   }
        // }, this);
        return this;
      };
    }
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
