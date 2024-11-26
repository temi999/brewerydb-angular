import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { ListComponent } from '../list/list.component';
import { Brewery } from '../../../core/models/brewery.model';
import { Observable } from 'rxjs';
import { BreweriesSearchService } from '../../services/breweries-search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { BreweriesFilter } from '../../../core/models/breweries-filter.model';
import { PaginationComponent } from '../pagination/pagination.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    FiltersComponent,
    ListComponent,
    PaginationComponent,
    NzSpinModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  destroyRef = inject(DestroyRef);

  private _breweries$: Observable<Array<Brewery>>;
  private _loading$: Observable<boolean>;
  private _page$: Observable<number>;
  private _pageSize$: Observable<number>;
  private _total$: Observable<number>;

  breweries: Array<Brewery> = [];
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 15;
  total: number = 0;

  constructor(
    private _service: BreweriesSearchService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this._breweries$ = this._service.breweries$;
    this._loading$ = this._service.loading$;
    this._page$ = this._service.page$;
    this._pageSize$ = this._service.pageSize$;
    this._total$ = this._service.total$;
  }

  ngOnInit(): void {
    this._breweries$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(breweries => {
      this.breweries = breweries ?? [];
      this._changeDetectorRef.markForCheck();
    });

    this._loading$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(loading => {
      this.loading = loading ?? [];
      this._changeDetectorRef.markForCheck();
    });

    this._page$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(page => {
      this.page = page ?? [];
      this._changeDetectorRef.markForCheck();
    });

    this._pageSize$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(pageSize => {
      this.pageSize = pageSize ?? [];
      this._changeDetectorRef.markForCheck();
    });

    this._total$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(total => {
      this.total = total ?? [];
      this._changeDetectorRef.markForCheck();
    });

    this._service.reload();
  }

  ngOnDestroy(): void {
    this._service.resetState();
  }

  onFilterChange(filter?: BreweriesFilter): void {
    this._service.setFilter(filter);
  }

  onPageChange(page: number): void {
    this._service.setPage(page);
  }
}
