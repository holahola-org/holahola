import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState, AuthPartialState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthPartialState, AuthState>(
  AUTH_FEATURE_KEY
);

export const getAuthError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const getSelectedId = createSelector(
  getAuthState,
  (state: AuthState) => state.selectedId
);
