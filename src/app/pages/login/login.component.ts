import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/auth.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl = '';

  // Local component signals
  localLoading = signal(false);
  localError = signal('');

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  // Expose auth service signals
  get authLoading() { return this.authService.authLoading; }
  get authError() { return this.authService.authError; }
  get isAuthenticated() { return this.authService.authIsAuthenticated; }

  // Combined loading state
  get loading() { return this.localLoading() || this.authLoading(); }

  // Combined error state
  get error() { return this.localError() || this.authError() || ''; }

  ngOnInit(): void {
    // Get return url from route parameters or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Redirect if already logged in
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.localLoading.set(true);
    this.localError.set('');

    try {
      const credentials: LoginCredentials = {
        username: this.f['username'].value,
        password: this.f['password'].value
      };

      await this.authService.login(credentials);

      // Successful login, redirect to return URL
      this.router.navigate([this.returnUrl]);
    } catch (error: any) {
      this.localError.set(error.message || 'Login failed. Please check your credentials.');
    } finally {
      this.localLoading.set(false);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
