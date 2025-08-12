import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User, ChangePasswordRequest } from '../../models/auth.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  user = signal<User | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  showChangePasswordModal = signal(false);

  changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user.set(currentUser);
    }
  }

  openChangePasswordModal() {
    this.changePasswordForm.reset();
    this.error.set(null);
    this.successMessage.set(null);
    this.showChangePasswordModal.set(true);
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal.set(false);
    this.changePasswordForm.reset();
  }

  async onChangePassword() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      const changePasswordData: ChangePasswordRequest = {
        currentPassword: formData.currentPassword!,
        newPassword: formData.newPassword!
      };

      try {
        this.isLoading.set(true);
        this.error.set(null);
        
        await this.authService.changePassword(
          changePasswordData.currentPassword,
          changePasswordData.newPassword
        );
        
        this.successMessage.set('Password changed successfully!');
        this.closeChangePasswordModal();
      } catch (error: any) {
        this.error.set(error.message || 'Failed to change password');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  passwordMatchValidator(group: any) {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  getUserRoleBadgeClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'badge-error';
      case 'manager':
        return 'badge-warning';
      case 'cashier':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  }

  getUserStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-error';
      case 'suspended':
        return 'badge-warning';
      default:
        return 'badge-neutral';
    }
  }

  clearMessages() {
    this.error.set(null);
    this.successMessage.set(null);
  }
}
