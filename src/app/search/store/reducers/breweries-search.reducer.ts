import { createReducer, on } from "@ngrx/store";
import { entityAdapter, initialState } from "../states/breweries-search.state";
import * as actions from '../actions/breweries-search.actions'

export const breweriesSearchReducer = createReducer(
  initialState,

  on(actions.reload, (state, action) => ({
    ...state,
    needReload: true,
  })),

  on(actions.load, (state, action) => entityAdapter.removeAll({
    ...state,
    needReload: false,
    breweriesLoading: true,
    metaDataLoading: true,
  })),

  on(actions.loadBreweriesSuccess, (state, action) => (entityAdapter.setAll(
    action.response ?? [],
    {
      ...state,
      needReload: false,
      breweriesLoading: false,
    }))
  ),

  on(actions.loadMetaDataSuccess, (state, action) => ({
    ...state,
    page: +action.response.page,
    pageSize: +action.response.per_page,
    total: +action.response.total,
    metaDataLoading: false,
  })),

  on(actions.loadFailed, state => entityAdapter.removeAll({
    ...state,
    needReload: false,
    breweriesLoading: false,
    metaDataLoading: false,
  })),

  on(actions.setFilter, (state, action) => entityAdapter.removeAll({
    ...state,
    needReload: true,
    page: 1,
    total: 0,
    filter: action.filter,
  })),

  on(actions.setPage, (state, action) => entityAdapter.removeAll({
    ...state,
    needReload: true,
    page: action.page,
  })),

  on(actions.resetState, () => entityAdapter.removeAll({
    ...initialState
  })),
);