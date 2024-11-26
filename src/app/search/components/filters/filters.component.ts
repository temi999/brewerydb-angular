import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BreweriesFilter } from '../../../core/models/breweries-filter.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzInputModule, NzSelectModule, ReactiveFormsModule, TranslocoDirective],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() filterChanged: EventEmitter<BreweriesFilter> = new EventEmitter<BreweriesFilter>();

  formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.formGroup = this._fb.group({
      'by_name': [''],
      'by_country': [null],
      'by_type': [null],
    });
  }

  resetFilter(): void {
    this.formGroup.reset();
    this.filterChanged.emit(undefined);
    this._changeDetectorRef.markForCheck();
  }
}
