import { inject, Injectable } from '@angular/core';
import { BreweriesSearchStoreService } from '../store/services/breweries-search.service';
import { Observable } from 'rxjs';
import { Brewery } from '../../core/models/brewery.model';
import { BreweriesFilter } from '../../core/models/breweries-filter.model';

@Injectable({
  providedIn: 'root'
})
export class BreweriesSearchService {
  private _storeService = inject(BreweriesSearchStoreService)

  public get breweries$(): Observable<Array<Brewery>> {
    return this._storeService.breweries$
  };

  public get loading$(): Observable<boolean> {
    return this._storeService.loading$;
  }

  public get page$(): Observable<number> {
    return this._storeService.page$;
  }

  public get pageSize$(): Observable<number> {
    return this._storeService.pageSize$;
  }

  public get total$(): Observable<number> {
    return this._storeService.total$;
  }

  public reload(): void {
    this._storeService.refreshBreweries();
  }

  public setFilter(filter?: BreweriesFilter): void {
    this._storeService.setFilter(filter);
  }

  public setPage(page: number): void {
    this._storeService.setPage(page);
  }

  public resetState(): void {
    this._storeService.resetState();
  }
}
