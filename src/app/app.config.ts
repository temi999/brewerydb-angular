import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { getBrowserLang, provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideStore } from '@ngrx/store';
import { breweriesSearchReducer } from './search/store/reducers/breweries-search.reducer';
import { ru_RU, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';

registerLocaleData(ru);

function preloadUserLanguage(transloco: TranslocoService) {
  return function() {
    let lang = '';
    if (!localStorage.getItem('pref_lang')) {
      lang = getBrowserLang() ?? 'ru';
      localStorage.setItem('pref_lang', lang);
    } else {
      lang = localStorage.getItem('pref_lang')!;
    }
    transloco.setActiveLang(lang);
    return transloco.load(lang);
  };
}

const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'bottomRight' },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideHttpClient(),
    provideTransloco({
        config: {
            availableLangs: ['en', 'ru'],
            defaultLang: 'ru',
            // Remove this option if your application doesn't support changing language in runtime.
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
    }),
    provideStore({ 'breweries-search': breweriesSearchReducer }), provideNzI18n(ru_RU), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: preloadUserLanguage,
      deps: [TranslocoService]
    },
    provideNzConfig(ngZorroConfig),
  ]
};
