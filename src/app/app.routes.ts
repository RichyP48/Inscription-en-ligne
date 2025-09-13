import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { authGuard, adminGuard, applicantGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home/home.component').then(c => c.HomeComponent)
      }
    ]
  },
  {
    path: 'applicant',
    component: DashboardLayoutComponent,
    canActivate: [authGuard, applicantGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/applicant/applicant-dashboard/applicant-dashboard.component').then(c => c.ApplicantDashboardComponent)
      }
    ]
  },
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/user-management/user-management.component').then(c => c.UserManagementComponent)
      },
      {
        path: 'users/:id',
        loadComponent: () => import('./features/admin/user-application/user-application.component').then(c => c.UserApplicationComponent)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
