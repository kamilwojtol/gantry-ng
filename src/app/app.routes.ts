import { Routes } from '@angular/router';
import { Board } from './board/board';
import { Login } from './login/login';
import { TaskManager } from './task-manager/task-manager';
import { authGuard } from './core/auth/auth.guard';
import { guestGuard } from './core/auth/guest.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'board',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'board',
    component: Board,
    canActivate: [authGuard],
  },
  {
    path: 'tasks',
    component: TaskManager,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];
