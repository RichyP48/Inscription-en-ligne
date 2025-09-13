import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { DashboardHeaderComponent } from '../../shared/components/dashboard-header/dashboard-header.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, DashboardHeaderComponent],
  template: `
    <div class="flex min-h-screen bg-gray-100">
      <app-sidebar></app-sidebar>
      <div class="flex-1 ml-64">
        <app-dashboard-header></app-dashboard-header>
        <main class="p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: ``
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.router.navigate(['/auth/login']);
    }
  }

  loadUserData() {
    return this.authService.getUserData();
  }
}