import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() popUpTitle!: string;
  @Input() popUpMessage!: string;
  
  private _map?: L.Map;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngAfterViewInit(): void {
    this._initMap();
  }

  private _initMap(): void {
    this._map = L.map('map', {
      center: [ this.latitude, this.longitude ],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this._map);

    const marker = L.marker([this.latitude, this.longitude]).addTo(this._map);

    marker.bindPopup(`<b>${this.popUpTitle}</b><br>${this.popUpMessage}`).openPopup();

    this._changeDetectorRef.markForCheck();
  }
}
