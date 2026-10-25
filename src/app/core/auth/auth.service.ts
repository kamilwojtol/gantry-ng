import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../../types/user';

const STORAGE_KEY = 'gantry_auth_user';

export const DEMO_USER: User = {
  id: 'usr-1',
  name: 'Jan Kowalski',
  email: 'jan.kowalski@example.com',
  role: 'Product Lead',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);

  private readonly _currentUser = signal<User | null>(this.loadStoredUser());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  login(email?: string, _password?: string): boolean {
    const user: User = {
      ...DEMO_USER,
      email: email?.trim() || DEMO_USER.email,
      name: email && email.includes('@') ? email.split('@')[0] : DEMO_USER.name,
    };

    this._currentUser.set(user);
    this.persistUser(user);
    return true;
  }

  logout(): void {
    this._currentUser.set(null);
    this.clearPersistedUser();
    this.router.navigate(['/login']);
  }

  private loadStoredUser(): User | null {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return null;
    }
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  }

  private persistUser(user: User): void {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  }

  private clearPersistedUser(): void {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return;
    }
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }
}
