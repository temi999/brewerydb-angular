import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit, Signal } from '@angular/core';
import { BreweryDetailsService } from '../../services/brewery-details.service';
import { Brewery } from '../../../core/models/brewery.model';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BreweryType, Country } from '../../../core/types';
import { MapComponent } from '../../../shared/components/map/map.component';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-brewery-details',
  standalone: true,
  imports: [CommonModule, TranslocoDirective, NzSpinModule, MapComponent],
  templateUrl: './brewery-details.component.html',
  styleUrl: './brewery-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreweryDetailsComponent implements OnInit {
  
  details?: Brewery;
  loading: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _detailsService: BreweryDetailsService,
    private _languageService: LanguageService,
  ) {
    effect(() => {
      this.details = this._detailsService.details();
    });

    effect(() => {
      this.loading = this._detailsService.loading();
    });
  }

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id');

    if (id) {
      this._detailsService.loadBreweryDetails(id);
    }
  }

  getCountryTranslationString(country: Country): string {
    return this._languageService.getCountryTranslationString(country);
  }

  getTypeTranslationString(type: BreweryType): string {
    return this._languageService.getTypeTranslationString(type);
  }
}
