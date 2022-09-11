/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
// / <reference types='leaflet.locatecontrol' />
// / <reference types='@runette/leaflet-fullscreen' />

/// <reference types='leaflet-sidebar-v2' />
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Map, Control, MapOptions, tileLayer, latLng, marker, icon, LocationEvent, SidebarOptions } from 'leaflet';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StoryApiService } from './services/story-api.service';
// import { NgxSidebarControlComponent } from '@runette/ngx-leaflet-sidebar'

@Component({
  selector: 'jhi-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // string holds the display version of the location
  public stories = [];

  // flags for whether the controls should be present
  public fsControlForm = new FormControl();
  public fsControl!: boolean;
  public locControlForm = new FormControl();
  public locControl!: boolean;

  // map variables
  public map: Map[] = [];
  public zoom: number[] = [];

  // sidebar variables
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public showLegend!: boolean;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public legendUrl!: SafeResourceUrl;
  private panelContent = {
    id: 'text',
    tab: '<i class="material-icons" title="text">description</i>',
    position: 'top',
    title: 'Marker Info',
    pane: '',
  };

  // map option object
  private markerIcon = icon({
    iconSize: [12, 21],
    iconAnchor: [6, 21],
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowSize: [12, 21],
    shadowAnchor: [6, 21],
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
  });
  public map1Options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
      // tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
      //   maxZoom: 19,
      //   detectRetina: true,
      //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      // })
    ],
    zoom: 4,
    center: latLng(54, 48),
  };

  // control option objects
  public locateOptions: Control.LocateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: true,
    locateOptions: {
      enableHighAccuracy: true,
    },
    icon: 'material-icons md-18 target icon',
    clickBehavior: {
      inView: 'stop',
      outOfView: 'setView',
      inViewNotFollowing: 'setView',
    },
  };
  public fullscreenOptions = {
    position: 'topleft',
    pseudoFullscreen: false,
    title: {
      true: 'Exit Fullscreen',
      false: 'View Fullscreen',
    },
  };
  public sidebarOptions: SidebarOptions = {
    position: 'right',
    autopan: true,
    closeButton: true,
    container: 'sidebar',
  };

  // @ViewChild(NgxSidebarControlComponent, { static: false })
  // sidebar!: NgxSidebarControlComponent;

  constructor(private sanitizer: DomSanitizer, private storyService: StoryApiService) {}

  ngOnInit(): void {
    this.storyService.getStoryList().subscribe((result: any) => {
      this.stories = result;
      console.log(result);
    });
  }

  ngAfterViewInit() {
    // set up listeners for the switches
    this.fsControlForm.valueChanges.subscribe(data => {
      this.fsControl = data;
    });
    this.locControlForm.valueChanges.subscribe(data => {
      this.locControl = data;
    });
  }

  receiveMap(map: Map, id: number) {
    this.map[id] = map;
    // if (this.stories.length !== 0) {
    this.stories.forEach(story => {
      marker(latLng(story['point']['latitude'], story['point']['longitude']), { icon: this.markerIcon, title: story['name'] })
        .addTo(map)
        .on('click', this.onClick, this);
    });
    // }
    // marker(latLng(51, 0), { icon: this.markerIcon, title: "United Kingdom" }).addTo(map).on('click', this.onClick, this);
    // marker(latLng(51, -80), { icon: this.markerIcon, title: "Canada" }).addTo(map).on('click', this.onClick, this);
  }

  receiveZoom(zoom: number, id: number) {
    this.zoom[id] = zoom;
    this.showLegend = false;
    this.legendUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openrailwaymap.org/api/legend-generator.php?zoom=${zoom}&style=standard&lang=en_GB`
    );
    this.showLegend = true;
  }

  onClick(data: { target: { options: { title: string } } }) {
    // const sidebar = this.sidebar.sidebar;
    // sidebar.removePanel('text');
    // const title = data.target.options.title as string;
    // const panelHtml = `<h1>${title}</h1><p>Some text for ${title}</p>`
    // this.panelContent.pane = panelHtml;
    // sidebar.addPanel(this.panelContent as PanelOptions);
    // sidebar.open('text');
  }
}
