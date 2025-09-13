import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Mes Notifications</h2>
          <button 
            *ngIf="unreadCount > 0"
            (click)="markAllAsRead()"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Tout marquer comme lu
          </button>
        </div>

        <div *ngIf="loading" class="p-8 text-center">
          <svg class="animate-spin h-8 w-8 mx-auto mb-4 text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Chargement des notifications...</p>
        </div>

        <div *ngIf="!loading && notifications.length === 0" class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <p class="text-gray-600">Aucune notification pour le moment</p>
        </div>

        <div *ngIf="!loading && notifications.length > 0" class="divide-y divide-gray-200">
          <div 
            *ngFor="let notification of notifications" 
            class="p-6 hover:bg-gray-50 cursor-pointer"
            [ngClass]="{'bg-blue-50': !notification.read}"
            (click)="markAsRead(notification)"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  [ngClass]="getNotificationBgClass(notification.type)"
                >
                  {{ getNotificationIcon(notification.type) }}
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-gray-900" [ngClass]="{'font-bold': !notification.read}">
                    {{ notification.title }}
                  </h3>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">
                      {{ formatDate(notification.createdAt) }}
                    </span>
                    <div *ngIf="!notification.read" class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                
                <p class="mt-2 text-gray-700">
                  {{ notification.message }}
                </p>
                
                <div 
                  *ngIf="notification.type !== 'INFO'"
                  class="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  [ngClass]="getStatusBadgeClass(notification.type)"
                >
                  {{ getStatusText(notification.type) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  loading = false;
  unreadCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUnreadCount();
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadUnreadCount(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (count) => {
        this.unreadCount = count;
      }
    });
  }

  markAsRead(notification: Notification): void {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: () => {
          notification.read = true;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
      });
    }
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.read = true);
        this.unreadCount = 0;
      }
    });
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'SUCCESS': return '✓';
      case 'WARNING': return '⚠';
      case 'ERROR': return '✗';
      default: return 'ℹ';
    }
  }

  getNotificationBgClass(type: string): string {
    switch (type) {
      case 'SUCCESS': return 'bg-green-500';
      case 'WARNING': return 'bg-yellow-500';
      case 'ERROR': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  }

  getStatusBadgeClass(type: string): string {
    switch (type) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  }

  getStatusText(type: string): string {
    switch (type) {
      case 'SUCCESS': return 'Approuvé';
      case 'WARNING': return 'Attention requise';
      case 'ERROR': return 'Rejeté';
      default: return 'Information';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}