import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { User } from '../models/auth.model';


export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  userStatus: string | null;
  isLoading: boolean;
  error: string | null;
  role: string | null;
  picUrl: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  userStatus: null,
  isLoading: false,
  error: null,
  role: null,
  picUrl: null,
  isAuthenticated: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ role, user, userStatus }) => ({

    userDisplayName: computed(() => {
      return user()?.name + (role() ? ` (${role()})` : '');
    }),
    userRole: computed(() => role()),
    isAdmin: computed(() => role() === 'SysAdmin'),
    isUserActive: computed(() => userStatus() === 'Active'),
  })),
  withMethods((store) => ({
    setLoading(loading: boolean) {
      patchState(store, { isLoading: loading });
    },

    setError(error: string | null) {
      patchState(store, { error });
    },

    clearError() {
      patchState(store, { error: null });
    },

    loginSuccess(user: User, accessToken: string, refreshToken?: string) {
      patchState(store, {
        user,
        accessToken,
        refreshToken: refreshToken || store.refreshToken(),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    },

    loginFailure(error: string) {
      patchState(store, {
        user: null,
        accessToken: null,
        refreshToken: null,
        userStatus: null,
        role: null,
        picUrl: null,
        isAuthenticated: false,
        isLoading: false,
        error,
      });
    },

    logout() {
      patchState(store, {
        user: null,
        accessToken: null,
        refreshToken: null,
        userStatus: null,
        role: null,
        picUrl: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    },

    updateToken(accessToken: string, refreshToken?: string) {
      patchState(store, {
        accessToken,
        refreshToken: refreshToken || store.refreshToken(),
      });
    },


    // Permission checking methods
    hasRole(role: string): boolean {
      return store.role() === role || false;
    },

    hasAnyRole(roles: string[]): boolean {
      const userRole = store.role();
      return userRole ? roles.includes(userRole) : false;
    },


    // State restoration (for app initialization)
    restoreState(state: Partial<AuthState>) {
      patchState(store, state);
    },

    // Reset entire state
    resetState() {
      patchState(store, initialState);
    },
  }))
);

export type AuthStoreType = InstanceType<typeof AuthStore>;
