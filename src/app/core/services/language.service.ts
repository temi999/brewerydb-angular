import { inject, Injectable } from '@angular/core';
import { BreweryType, Country, Language } from '../types';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _transloco = inject(TranslocoService)

  public getActiveLang(): string {
    console.log();
    return this._transloco.getActiveLang();
  }

  public setLanguage(lang: Language): void {
    localStorage.setItem('pref_lang', lang);
    this._transloco.setActiveLang(lang);
  }

  public getTranslation(key: string): string {
    const activeLang = this.getActiveLang();
    return this._transloco.getTranslation(activeLang)[key] ?? '';
  }

  public getCountryTranslationString(country: Country): string {
    return 'filters.countries.' + country.toLowerCase().replace(' ', '_');
  }

  public getTypeTranslationString(type: BreweryType): string {
    return 'filters.types.' + type.toLowerCase();
  }
}
