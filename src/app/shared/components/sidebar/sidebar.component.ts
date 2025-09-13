import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export interface SidebarItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="w-64 z-[500] bg-primary-900 text-white min-h-screen fixed left-0 top-0 ">
      
      <!-- Logo -->
      <div class="p-6 border-b border-primary-800">
        <h2 class="text-xl font-bold">
          <span class="text-orange-400">Register</span>Richy48
        </h2>
      </div>

      <!-- Navigation -->
      <nav class="mt-10">
        <ul class="space-y-2 px-4">
          <li *ngFor="let item of menuItems">
            <a [routerLink]="item.route" routerLinkActive="bg-orange-500 border-r-4 border-orange-300" 
               [routerLinkActiveOptions]="{exact: item.route === '/admin'}"
               class="flex items-center px-4 py-3 text-white hover:bg-primary-700 hover:text-orange-200 rounded-lg transition-colors duration-200 font-medium">
              <ng-container [ngSwitch]="item.icon">
                <svg *ngSwitchCase="'layout-dashboard'" class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <svg *ngSwitchCase="'users'" class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                </svg>
                <svg *ngSwitchCase="'file-text'" class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
              </ng-container>
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- User Info -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span class="text-sm font-bold text-primary-900">{{ userInitials }}</span>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">{{ userName }}</p>
              <p class="text-xs text-primary-300">{{ userRole }}</p>
            </div>
          </div>
          <button (click)="logout()" class="p-2 bg-red-600 hover:bg-red-700 text-white rounded" title="Déconnexion">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  `,
  styles: ``
})
export class SidebarComponent implements OnInit {
  menuItems: SidebarItem[] = [];
  userName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.setMenuByRole();
  }

  loadUserData() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.userName = userData.email || 'Utilisateur';
      this.userRole = userData.roles[0] || 'user';
    }
  }

  setMenuByRole() {
    if (this.authService.isAdmin()) {
      this.menuItems = [
        { label: 'Dashboard', route: '/admin', icon: 'layout-dashboard' },
        { label: 'Gestion Utilisateurs', route: '/admin/users', icon: 'users' }
      ];
    } else if (this.authService.isApplicant()) {
      this.menuItems = [
        { label: 'Mon Dossier', route: '/applicant', icon: 'file-text' }
      ];
    }
  }

  get userInitials(): string {
    return this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}