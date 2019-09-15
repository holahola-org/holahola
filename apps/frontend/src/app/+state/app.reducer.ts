import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppActions from './app.actions';
import { AppEntity } from './app.models';

export const APP_FEATURE_KEY = 'app';

export interface AppState extends EntityState<AppEntity> {
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: string | null; // last none error (if any)
  showSideNav: boolean;
  showSecondSideNav: boolean;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const appAdapter: EntityAdapter<AppEntity> = createEntityAdapter<
  AppEntity
>();

export const initialState: AppState = appAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  showSideNav: false,
  showSecondSideNav: false
});

const appReducer = createReducer(
  initialState,
  on(AppActions.loadApp, state => ({ ...state, loaded: false, error: null })),
  on(AppActions.loadAppSuccess, (state, { app }) =>
    appAdapter.addAll(app, { ...state, loaded: true })
  ),
  on(AppActions.loadAppFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
