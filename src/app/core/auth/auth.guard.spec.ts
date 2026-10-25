import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';
import { AuthService } from './auth.service';

describe('Auth & Guest Guards', () => {
  let authService: AuthService;
  let router: Router;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/board' } as RouterStateSnapshot;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService, provideRouter([])],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('authGuard', () => {
    it('should redirect to /login?returnUrl=/board when not authenticated', () => {
      const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));
      expect(result instanceof UrlTree).toBe(true);
      const urlTree = result as UrlTree;
      expect(urlTree.toString()).toContain('/login?returnUrl=%2Fboard');
    });

    it('should allow navigation when authenticated', () => {
      authService.login();
      const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));
      expect(result).toBe(true);
    });
  });

  describe('guestGuard', () => {
    it('should allow access to login when not authenticated', () => {
      const result = TestBed.runInInjectionContext(() => guestGuard(mockRoute, mockState));
      expect(result).toBe(true);
    });

    it('should redirect to /board when already authenticated', () => {
      authService.login();
      const result = TestBed.runInInjectionContext(() => guestGuard(mockRoute, mockState));
      expect(result instanceof UrlTree).toBe(true);
      const urlTree = result as UrlTree;
      expect(urlTree.toString()).toBe('/board');
    });
  });
});
