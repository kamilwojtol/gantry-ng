import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthService, DEMO_USER } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService, provideRouter([])],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start as unauthenticated when storage is empty', () => {
    expect(service.currentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should log in user and update signals', () => {
    const success = service.login('test@example.com', 'password123');
    expect(success).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(service.currentUser()?.email).toBe('test@example.com');
  });

  it('should log in demo user when no credentials passed', () => {
    service.login();
    expect(service.isAuthenticated()).toBe(true);
    expect(service.currentUser()?.name).toBe(DEMO_USER.name);
  });

  it('should log out, clear user and navigate to login', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    service.login();
    expect(service.isAuthenticated()).toBe(true);

    service.logout();
    expect(service.currentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
