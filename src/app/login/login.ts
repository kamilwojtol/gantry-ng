import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, DEMO_USER } from '../core/auth/auth.service';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly email = signal('jan.kowalski@example.com');
  readonly password = signal('haslo123');
  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = signal(false);

  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const emailVal = this.email().trim();
    const passwordVal = this.password().trim();

    if (!emailVal || !passwordVal) {
      this.errorMessage.set('Wprowadź adres e-mail oraz hasło.');
      return;
    }

    this.errorMessage.set(null);
    this.authService.login(emailVal, passwordVal);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/board';
    this.router.navigateByUrl(returnUrl);
  }

  useDemoAccount(): void {
    this.email.set(DEMO_USER.email);
    this.password.set('demo1234');
    this.onSubmit();
  }
}
