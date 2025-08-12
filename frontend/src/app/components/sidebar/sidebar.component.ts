import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthStore } from '../../stores/auth.store';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() isOpen = true;

    private authService = inject(AuthService);
    private router = inject(Router);
    private authStore = inject(AuthStore);

    // Submenu states
    salesMenuOpen = false;
    inventoryMenuOpen = false;
    customersMenuOpen = false;
    reportsMenuOpen = false;
    settingsMenuOpen = false;

    // User info getters
    get userName() {
        return this.authStore.user()?.name || 'User';
    }

    get userRole() {
        return this.authStore.role() || 'Guest';
    }

    get userPicUrl() {
        return this.authStore.picUrl();
    }

    toggleSubmenu(menuType: string) {
        switch (menuType) {
            case 'sales':
                this.salesMenuOpen = !this.salesMenuOpen;
                break;
            case 'inventory':
                this.inventoryMenuOpen = !this.inventoryMenuOpen;
                break;
            case 'customers':
                this.customersMenuOpen = !this.customersMenuOpen;
                break;
            case 'reports':
                this.reportsMenuOpen = !this.reportsMenuOpen;
                break;
            case 'settings':
                this.settingsMenuOpen = !this.settingsMenuOpen;
                break;
        }
    }

    // Close all submenus when sidebar is collapsed
    closeAllSubmenus() {
        this.salesMenuOpen = false;
        this.inventoryMenuOpen = false;
        this.customersMenuOpen = false;
        this.reportsMenuOpen = false;
        this.settingsMenuOpen = false;
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
