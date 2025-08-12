import { Component, OnInit, signal, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
    private authService = inject(AuthService);
    private productService = inject(ProductService);
    private router = inject(Router);

    user = this.authService.authUser;
    isLoading = signal(false);
    stats = signal({
        totalProducts: 0,
        lowStockProducts: 0,
        totalUsers: 1,
        apiStatus: 'checking...'
    });

    quickActions = [
        {
            title: 'Manage Products',
            description: 'Add, edit, or remove products from inventory',
            icon: 'fas fa-boxes',
            route: '/products',
            color: 'bg-blue-500'
        },
        {
            title: 'User Profile',
            description: 'View and update your profile information',
            icon: 'fas fa-user',
            route: '/profile',
            color: 'bg-green-500'
        },
        {
            title: 'Auth Management',
            description: 'Register new users or reset passwords',
            icon: 'fas fa-user-cog',
            route: '/auth-management',
            color: 'bg-purple-500'
        }
    ];

    ngOnInit() {
        this.loadDashboardData();
    }

    async loadDashboardData() {
        this.isLoading.set(true);
        
        try {
            // Test API connectivity by fetching products
            const products = await this.productService.getAllProducts().toPromise();
            const currentStats = this.stats();
            
            this.stats.set({
                ...currentStats,
                totalProducts: products?.length || 0,
                lowStockProducts: products?.filter(p => p.stockQuantity <= p.minimumStock).length || 0,
                apiStatus: 'connected'
            });
        } catch (error) {
            console.error('Dashboard data loading error:', error);
            const currentStats = this.stats();
            this.stats.set({
                ...currentStats,
                apiStatus: 'error'
            });
        } finally {
            this.isLoading.set(false);
        }
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

    getGreeting(): string {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }

    getApiStatusClass(): string {
        const status = this.stats().apiStatus;
        if (status === 'connected') return 'badge-success';
        if (status === 'error') return 'badge-error';
        return 'badge-warning';
    }
}