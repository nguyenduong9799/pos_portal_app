import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

export interface MenuItem {
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    action?: () => void;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() isOpen = false;

    private authService = inject(AuthService);
    private router = inject(Router);

    menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
            route: '/dashboard'
        },
        {
            label: 'Orders',
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
            children: [
                { label: 'All Orders', icon: '', route: '/orders' },
                { label: 'Pending', icon: '', route: '/orders/pending' },
                { label: 'Completed', icon: '', route: '/orders/completed' }
            ]
        },
        {
            label: 'Products',
            icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
            children: [
                { label: 'All Products', icon: '', route: '/products' },
                { label: 'Categories', icon: '', route: '/products/categories' },
                { label: 'Inventory', icon: '', route: '/products/inventory' }
            ]
        },
        {
            label: 'Customers',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
            route: '/customers'
        },
        {
            label: 'Analytics',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
            children: [
                { label: 'Sales Report', icon: '', route: '/analytics/sales' },
                { label: 'Revenue', icon: '', route: '/analytics/revenue' },
                { label: 'Performance', icon: '', route: '/analytics/performance' }
            ]
        },
        {
            label: 'Settings',
            icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
            route: '/settings'
        }
    ];

    expandedItems: Set<string> = new Set();

    toggleSubmenu(label: string) {
        if (this.expandedItems.has(label)) {
            this.expandedItems.delete(label);
        } else {
            this.expandedItems.add(label);
        }
    }

    isExpanded(label: string): boolean {
        return this.expandedItems.has(label);
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
