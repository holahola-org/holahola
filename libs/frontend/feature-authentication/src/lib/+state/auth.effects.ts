import { AuthService } from '@ngx-utility/authentication';
import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { AuthPartialState, AUTH_FEATURE_KEY } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  loadAuth$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.loadAuth, {
      run: (
        action: ReturnType<typeof AuthActions.loadAuth>,
        state: AuthPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return AuthActions.loadAuthSuccess();
      },

      onError: (action: ReturnType<typeof AuthActions.loadAuth>, error) => {
        console.error('Error', error);
        return AuthActions.loadAuthFailure({ error });
      }
    })
  );

  login$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.loginRequest, {
      run: (
        action: ReturnType<typeof AuthActions.loginRequest>,
        state: AuthPartialState
      ) => {
        if (!state[AUTH_FEATURE_KEY].lockedOut) {
          return this.authService
            .login(action.userLogin)
            .pipe(map(user => AuthActions.loginSuccess({ user })));
        } else {
          return AuthActions.loginFailure({ error: 'Account is locked.' });
        }
      },

      onError: (action: ReturnType<typeof AuthActions.loginRequest>, error) => {
        console.error('Error', error);
        return AuthActions.loginFailure({ error });
      }
    })
  );

  loginSuccess$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.loginSuccess, {
      run: (
        action: ReturnType<typeof AuthActions.loginSuccess>,
        state: AuthPartialState
      ) => {
        localStorage.setItem(
          'accessToken',
          state[AUTH_FEATURE_KEY].accessToken
        );
        console.log(action);
        console.log(state);
      },
      onError: (action: ReturnType<typeof AuthActions.loginSuccess>, error) => {
        console.error('Error', error);
        return AuthActions.loginFailure({ error });
      }
    })
  );

  register$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.registerRequest, {
      run: (
        action: ReturnType<typeof AuthActions.registerRequest>,
        state: AuthPartialState
      ) => {
        return this.authService
          .register(action.userRegister)
          .pipe(map(user => AuthActions.registerSuccess({ user })));
      },

      onError: (
        action: ReturnType<typeof AuthActions.registerRequest>,
        error
      ) => {
        console.error('Error', error);
        return AuthActions.registerFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dataPersistence: DataPersistence<AuthPartialState>
  ) {}
}