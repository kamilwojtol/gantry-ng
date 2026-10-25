import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  logout(): void {
    this.closeMobileMenu();
    this.authService.logout();
  }
}
