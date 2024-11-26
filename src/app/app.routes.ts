import { Routes } from '@angular/router';
import { SearchComponent } from './search/components/search/search.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { BreweryDetailsComponent } from './details/components/details/brewery-details.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'breweries'
  },
  {
    path: 'breweries/:id',
    component: BreweryDetailsComponent,
  },
  {
    path: 'breweries',
    component: SearchComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
