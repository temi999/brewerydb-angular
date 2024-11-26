import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreweriesSearchState } from '../states/breweries-search.state';
import * as selectors from '../selectors/breweries-search.selectors'
import * as actions from '../actions/breweries-search.actions'
import { catchError, combineLatest, filter, map, Observable, share, startWith, switchMap, tap, withLatestFrom } from 'rxjs';
import { BreweriesApiSource } from '../../../core/sources/breweries-api.source';
import { IBrewery } from '../../../core/interfaces/brewery.interface';
import { IBreweriesMetaData } from '../../../core/interfaces/breweries-meta-data.interface';
import { BreweriesFilter } from '../../../core/models/breweries-filter.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LanguageService } from '../../../core/services/language.service';

@Injectable({
  providedIn: 'root'
})
export class BreweriesSearchStoreService {
  private _store = inject(Store<BreweriesSearchState>);
  private _api = inject(BreweriesApiSource);
  private _languageService = inject(LanguageService);
  private _notificationService = inject(NzNotificationService);

  private _requireData$ = this._store.select(selectors.selectNeedReload).pipe(
    filter(needReload => !!needReload),
    tap(() => this._store.dispatch(actions.load())),
    withLatestFrom(combineLatest([
      this._store.select(selectors.selectPage),
      this._store.select(selectors.selectPageSize),
      this._store.select(selectors.selectFilter),
    ])),
    switchMap(([needReload, [page, pageSize, filter]]) => combineLatest([
      this._getBreweriesList(page, pageSize, filter),
      this._getBreweriesMetaData(page, pageSize, filter),
    ])),
    tap(([data, metaData]) => {
      this._store.dispatch(actions.loadBreweriesSuccess({response: data}));
      this._store.dispatch(actions.loadMetaDataSuccess({response: metaData}));
    }),
    catchError((error, caught) => {
      const errorTitle: string = this._languageService.getTranslation('fetchBreweriesErrorTitle');
      this._notificationService.error(errorTitle, error?.message ?? errorTitle);
      this._store.dispatch(actions.loadFailed({errorMessage: error?.message}));
      return caught;
    }),
    share(),
  );

  public breweries$: Observable<Array<IBrewery>> = combineLatest([
    this._requireData$.pipe(startWith([])),
    this._store.select(selectors.selectEntitiesArr)
  ]).pipe(
    map(([_, entities]) => entities)
  );

  public loading$: Observable<boolean> = this._store.select(selectors.selectLoading);
  public page$: Observable<number> = this._store.select(selectors.selectPage);
  public pageSize$: Observable<number> = this._store.select(selectors.selectPageSize);
  public total$: Observable<number> = this._store.select(selectors.selectTotal);

  public refreshBreweries(): void {
    this._store.dispatch(actions.reload());
  }

  public setFilter(filter?: BreweriesFilter): void {
    this._store.dispatch(actions.setFilter({ filter: filter }));
  }

  public setPage(page: number): void {
    this._store.dispatch(actions.setPage({ page: page }));
  }

  public resetState(): void {
    this._store.dispatch(actions.resetState());
  }

  private _getBreweriesList(page: number, pageSize: number, filter?: any): Observable<Array<IBrewery>> {
    return this._api.getBreweriesList(page, pageSize, filter)
  }

  private _getBreweriesMetaData(page: number, pageSize: number, filter?: any): Observable<IBreweriesMetaData> {
    return this._api.getBreweriesMetaData(page, pageSize, filter)
  }
}
