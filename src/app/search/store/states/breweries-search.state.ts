import { IBrewery } from "../../../core/interfaces/brewery.interface";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BreweriesFilter } from "../../../core/models/breweries-filter.model";

export interface BreweriesSearchState extends EntityState<IBrewery> {
  needReload: boolean;
  breweriesLoading: boolean;
  metaDataLoading: boolean;
  filter?: BreweriesFilter,
  hasMore?: boolean;
  total: number;
  page: number;
  pageSize: number;
}

export const entityAdapter: EntityAdapter<IBrewery> = createEntityAdapter<IBrewery>({
  selectId: (model: IBrewery) => model.id,
});

export const initialState: BreweriesSearchState = entityAdapter.getInitialState({
  needReload: false,
  breweriesLoading: false,
  metaDataLoading: false,
  total: 0,
  page: 1,
  pageSize: 15,
});
