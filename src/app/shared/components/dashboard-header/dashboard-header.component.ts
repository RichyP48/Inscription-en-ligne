import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, NotificationsComponent],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">{{ getPageTitle() }}</h1>
          <p class="text-sm text-gray-600">{{ getPageSubtitle() }}</p>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <app-notifications *ngIf="authService.isApplicant()"></app-notifications>
          
          <!-- User Info -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span class="text-sm font-bold text-white">{{ userInitials }}</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
              <p class="text-xs text-gray-500">{{ userRole }}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: ``
})
export class DashboardHeaderComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  notificationCount: number = 0;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
    this.setNotificationsByRole();
  }

  loadUserData() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.userName = userData.email || 'Utilisateur';
      this.userRole = userData.roles[0] || 'user';
    }
  }

  setNotificationsByRole() {
    if (this.authService.isAdmin()) {
      this.notificationCount = 3; // Nouvelles candidatures
    } else if (this.authService.isApplicant()) {
      this.notificationCount = 1; // Mise à jour du dossier
    }
  }

  getPageTitle(): string {
    if (this.authService.isAdmin()) {
      return 'Administration';
    } else if (this.authService.isApplicant()) {
      return 'Mon Espace';
    }
    return 'Dashboard';
  }

  getPageSubtitle(): string {
    if (this.authService.isAdmin()) {
      return 'Gestion des candidatures et utilisateurs';
    } else if (this.authService.isApplicant()) {
      return 'Gérez votre candidature';
    }
    return '';
  }

  get userInitials(): string {
    return this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}