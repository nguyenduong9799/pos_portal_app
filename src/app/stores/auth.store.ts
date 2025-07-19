import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    // Computed values derived from state
    userDisplayName: computed(() => {
      const currentUser = user();
      if (!currentUser) return '';
      return `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.username;
    }),

    userInitials: computed(() => {
      const currentUser = user();
      if (!currentUser) return '';
      const firstName = currentUser.firstName?.charAt(0)?.toUpperCase() || '';
      const lastName = currentUser.lastName?.charAt(0)?.toUpperCase() || '';
      return firstName + lastName || currentUser.username?.charAt(0)?.toUpperCase() || '?';
    }),

    userRole: computed(() => user()?.role || ''),

    isAdmin: computed(() => user()?.role === 'admin'),

    hasPermission: computed(() => (permission: string) => {
      const currentUser = user();
      return currentUser?.permissions?.includes(permission) || false;
    }),

    userEmail: computed(() => user()?.email || ''),

    isUserActive: computed(() => user()?.isActive || false),
  })),
  withMethods((store) => ({
    // Authentication methods
    setLoading(loading: boolean) {
      patchState(store, { isLoading: loading });
    },

    setError(error: string | null) {
      patchState(store, { error });
    },

    clearError() {
      patchState(store, { error: null });
    },

    loginSuccess(user: User, token: string, refreshToken?: string) {
      patchState(store, {
        user,
        token,
        refreshToken: refreshToken || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    },

    loginFailure(error: string) {
      patchState(store, {
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error,
      });
    },

    logout() {
      patchState(store, {
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    },

    updateUser(user: User) {
      patchState(store, { user });
    },

    updateToken(token: string, refreshToken?: string) {
      patchState(store, {
        token,
        refreshToken: refreshToken || store.refreshToken(),
      });
    },

    // Profile management methods
    updateProfile(updates: Partial<User>) {
      const currentUser = store.user();
      if (currentUser) {
        patchState(store, {
          user: { ...currentUser, ...updates },
        });
      }
    },

    // Permission checking methods
    hasRole(role: string): boolean {
      return store.user()?.role === role || false;
    },

    hasAnyRole(roles: string[]): boolean {
      const userRole = store.user()?.role;
      return userRole ? roles.includes(userRole) : false;
    },

    hasPermissions(permissions: string[]): boolean {
      const userPermissions = store.user()?.permissions || [];
      return permissions.every(permission => userPermissions.includes(permission));
    },

    hasAnyPermission(permissions: string[]): boolean {
      const userPermissions = store.user()?.permissions || [];
      return permissions.some(permission => userPermissions.includes(permission));
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
