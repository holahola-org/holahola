import * as AuthActions from './auth.actions';
import { AuthState, initialState, reducer } from './auth.reducer';

describe('Auth Reducer', () => {
  beforeEach(() => {});

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
