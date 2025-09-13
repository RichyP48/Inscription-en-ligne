import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
  relatedEntityType?: string;
  relatedEntityId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = `${environment.apiUrl}/api/applicant/notifications`;

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.API_URL);
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/unread-count`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${notificationId}/read`, {});
  }

  markAllAsRead(): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/mark-all-read`, {});
  }
}