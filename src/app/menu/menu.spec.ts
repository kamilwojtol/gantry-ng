import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Menu } from './menu';
import { AuthService } from '../core/auth/auth.service';

@Component({ template: '' })
class DummyView {}

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;
  let authService: AuthService;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [
        provideRouter([
          { path: 'login', component: DummyView },
          { path: 'board', component: DummyView },
          { path: 'tasks', component: DummyView },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    await fixture.whenStable();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should call authService.logout on logout()', () => {
    const logoutSpy = vi.spyOn(authService, 'logout');
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should render brand title Gantry', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Gantry');
  });
});
