import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { filter } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../types';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NzMenuModule, NzLayoutModule, NzIconModule, NzToolTipModule, TranslocoDirective],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  currentUrl: string = '';
  activeLang: string = 'ru';

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentUrl = event.url;
      this._changeDetectorRef.markForCheck();
    });

    this.activeLang = this._languageService.getActiveLang();
    this._changeDetectorRef.markForCheck();
  }

  setLanguage(lang: Language) {
    this._languageService.setLanguage(lang);
    this.activeLang = lang;
    this._changeDetectorRef.markForCheck();
  }
}
