import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Brewery } from '../../../core/models/brewery.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { BreweryType, Country } from '../../../core/types';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzToolTipModule, TranslocoDirective, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() details!: Brewery;

  constructor(
    private _languageService: LanguageService,
  ) {}

  getCountryTranslationString(country: Country): string {
    return this._languageService.getCountryTranslationString(country);
  }

  getTypeTranslationString(type: BreweryType): string {
    return this._languageService.getTypeTranslationString(type);
  }
}
