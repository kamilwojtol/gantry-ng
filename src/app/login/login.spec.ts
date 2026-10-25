import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Login } from './login';
import { AuthService } from '../core/auth/auth.service';

@Component({ template: '' })
class DummyView {}

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([
          { path: 'board', component: DummyView },
          { path: 'login', component: DummyView },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error message if email or password is empty', () => {
    component.email.set('');
    component.password.set('');
    component.onSubmit();
    expect(component.errorMessage()).toBe('Wprowadź adres e-mail oraz hasło.');
  });

  it('should log in and navigate on submit', () => {
    const navigateSpy = vi.spyOn(router, 'navigateByUrl');
    const loginSpy = vi.spyOn(authService, 'login');

    component.email.set('user@test.pl');
    component.password.set('secret');
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith('user@test.pl', 'secret');
    expect(navigateSpy).toHaveBeenCalledWith('/board');
  });

  it('should handle useDemoAccount() by pre-filling and submitting', () => {
    const loginSpy = vi.spyOn(authService, 'login');
    const navigateSpy = vi.spyOn(router, 'navigateByUrl');

    component.useDemoAccount();

    expect(component.email()).toBe('jan.kowalski@example.com');
    expect(loginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/board');
  });
});
