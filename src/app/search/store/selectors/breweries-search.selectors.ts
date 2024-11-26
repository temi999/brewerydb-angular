import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BreweriesSearchState } from "../states/breweries-search.state";

export const selectState = createFeatureSelector<BreweriesSearchState>('breweries-search');

export const selectEntities = createSelector(
  selectState,
  (state) => state.entities,
);

export const selectEntitiesArr = createSelector(
  selectState,
  state => (state.ids ?? []).map(key => state.entities[key]!));

export const selectNeedReload = createSelector(
  selectState,
  (state) => state.needReload,
);

export const selectLoading = createSelector(
  selectState,
  (state) => state.breweriesLoading || state.metaDataLoading,
);

export const selectFilter = createSelector(
  selectState,
  (state) => state.filter,
);

export const selectPage = createSelector(
  selectState,
  (state) => state.page,
);

export const selectPageSize = createSelector(
  selectState,
  (state) => state.pageSize,
);

export const selectTotal = createSelector(
  selectState,
  (state) => state.total,
);