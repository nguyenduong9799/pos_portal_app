import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest, ForgotPasswordRequest } from '../../models/auth.model';

@Component({
  selector: 'app-auth-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-management.component.html',
  styleUrl: './auth-management.component.scss'
})
export class AuthManagementComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  activeTab = signal<'register' | 'forgot-password'>('register');
  isLoading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    phoneNumber: ['']
  }, { validators: this.passwordMatchValidator });

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  setActiveTab(tab: 'register' | 'forgot-password') {
    this.activeTab.set(tab);
    this.clearMessages();
    this.resetForms();
  }

  resetForms() {
    this.registerForm.reset();
    this.forgotPasswordForm.reset();
  }

  clearMessages() {
    this.error.set(null);
    this.successMessage.set(null);
  }

  passwordMatchValidator(group: any) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
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

  async onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const registerData: RegisterRequest = {
        email: formData.email!,
        password: formData.password!,
        name: formData.name!,
        phoneNumber: formData.phoneNumber || undefined
      };

      try {
        this.isLoading.set(true);
        this.error.set(null);
        
        const response = await this.authService.register({
          username: registerData.email,
          email: registerData.email,
          password: registerData.password,
          firstName: registerData.name,
          lastName: ''
        });
        
        this.successMessage.set('Registration successful! Redirecting to dashboard...');
        
        // Redirect to dashboard after successful registration
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
        
      } catch (error: any) {
        this.error.set(error.message || 'Registration failed. Please try again.');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  async onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
      
      try {
        this.isLoading.set(true);
        this.error.set(null);
        
        await this.authService.forgotPassword(formData.email!);
        
        this.successMessage.set(
          'If your email is registered, you will receive password reset instructions shortly.'
        );
        this.forgotPasswordForm.reset();
        
      } catch (error: any) {
        this.error.set(error.message || 'Failed to send reset instructions. Please try again.');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
