import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../stores/auth.store';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Local component state
  error = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  // Expose auth service signals via getters
  get currentUser() { return this.authService.authUser; }
  get isLoading() { return this.authService.authLoading; }
  get authError() { return this.authService.authError; }
  get userDisplayName() { return this.authService.userDisplayName; }
  get userInitials() { return this.authService.userInitials; }
  get isAdmin() { return this.authService.isAdmin; }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToSales(): void {
    this.router.navigate(['/sales']);
  }

  navigateToReports(): void {
    this.router.navigate(['/reports']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
