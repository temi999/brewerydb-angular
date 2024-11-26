import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Brewery } from '../../core/models/brewery.model';
import { BreweriesApiSource } from '../../core/sources/breweries-api.source';
import { UUID } from '../../core/types';
import { catchError, take } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LanguageService } from '../../core/services/language.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreweryDetailsService {
  private _api = inject(BreweriesApiSource);
  private _languageService = inject(LanguageService);
  private _notificationService = inject(NzNotificationService);
  private _breweryId?: UUID;
  private _router = inject(Router);

  public details: WritableSignal<Brewery | undefined> = signal<Brewery | undefined>(undefined);
  public loading: WritableSignal<boolean> = signal<boolean>(false);

  public loadBreweryDetails(id: UUID): void {
    this._breweryId = id;
    this.loading.set(true);
    this._api.getBreweryDetails(this._breweryId).pipe(
      take(1),
      catchError((err, caught) => {
        const errorTitle = this._languageService.getTranslation('fetchBreweryDetailsErrorTitle');
        this._notificationService.error(errorTitle, err?.message ?? errorTitle);
        throw err;
      })
    ).subscribe({
      next: res => {
        this.details.set(res);
        this.loading.set(false);
      },
      error: err => {
        this.details.set(undefined);
        this.loading.set(false);
        this._router.navigate(['404']);
      },
    });
  }
}
