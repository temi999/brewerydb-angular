import { createAction, props } from "@ngrx/store";
import { IBrewery } from "../../../core/interfaces/brewery.interface";
import { IBreweriesMetaData } from "../../../core/interfaces/breweries-meta-data.interface";
import { BreweriesFilter } from "../../../core/models/breweries-filter.model";

const prefix = '[Breweries Search] ';

export const reload = createAction(
  `${prefix} Reload`,
);

export const load = createAction(
  `${prefix} Load`,
);

export const loadBreweriesSuccess = createAction(
  `${prefix} Load Breweries Success`,
  props<{ response: Array<IBrewery> }>()
);

export const loadMetaDataSuccess = createAction(
  `${prefix} Load Meta Data Success`,
  props<{ response: IBreweriesMetaData }>()
);

export const loadFailed = createAction(
  `${prefix} Load Failed`,
  props<{errorMessage?: string}>()
);

export const setFilter = createAction(
  `${prefix} Set Filter`,
  props<{filter?: BreweriesFilter}>()
);

export const setPage = createAction(
  `${prefix} Set Page`,
  props<{page: number}>()
);

export const resetState = createAction(
  `${prefix} Reset State`,
);