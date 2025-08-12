import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule,],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    @Output() toggleSidebar = new EventEmitter<void>();

    private authService = inject(AuthService);
    private router = inject(Router);

    user$ = this.authService.userDisplayName;

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
