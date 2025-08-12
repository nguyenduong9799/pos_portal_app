# POS Portal App
POS Portal App is an Angular 19.2.0 TypeScript web application that provides a point-of-sale portal with authentication, dashboard, and management features. It uses TailwindCSS with DaisyUI for styling, NgRx signals for state management, and connects to an external API for backend operations.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Dependencies
- Node.js v20.19.4 and npm v10.8.2 are available and working
- No additional SDK installations required

### Bootstrap and Build Process
- **Install dependencies**: `npm install` -- takes 2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
  - Expect warnings about deprecated packages (rimraf, inflight, glob) - these are normal
  - Run `npm audit fix` after installation to address low severity vulnerabilities
- **Production build**: `npm run build` -- takes 9 seconds. Set timeout to 2+ minutes.
  - Outputs to `dist/pos_portal_app/` directory
  - Build artifacts include: browser/, 3rdpartylicenses.txt, prerendered-routes.json
- **Development build**: `npm start` -- initial build takes 8 seconds, then serves. Set timeout to 2+ minutes.
  - Serves on http://localhost:4200/
  - Includes hot module reloading (HMR)
  - Watch mode enabled for file changes

### Testing
- **Unit tests**: `npm test -- --watch=false --browsers=ChromeHeadless` -- takes 15 seconds. NEVER CANCEL. Set timeout to 2+ minutes.
  - Uses Karma with Jasmine testing framework
  - **Expected behavior**: 2 tests pass, 1 test fails (known issue with default Angular template test)
  - The failing test expects an h1 element that doesn't exist in the customized template - this is normal
- **No e2e testing framework configured** - use manual validation scenarios described below

### SSR (Server-Side Rendering)
- **SSR is mentioned in package.json but NOT properly configured**
- The `npm run serve:ssr:pos_portal_app` command will fail because server build files don't exist
- Do not attempt to use SSR functionality until it's properly configured

## Validation Scenarios

### CRITICAL: Manual Validation Requirements
After making any changes, ALWAYS run through these validation scenarios:

1. **Application Startup Validation**:
   - Run `npm start`
   - Navigate to http://localhost:4200/
   - Verify app redirects to `/login?returnUrl=%2Fdashboard`
   - Verify login page displays with "POS Portal" heading

2. **Authentication Flow Validation**:
   - Enter username: `admin`
   - Enter password: `admin` (should show validation error: "Password must be at least 6 characters")
   - Enter password: `admin123` (should pass validation)
   - Click "Sign In" button
   - Verify network request is made to external API (https://admin.reso.vn/api/v1)
   - Verify "Network Error" message appears (expected due to external API access restrictions)

3. **Build Validation**:
   - Run `npm run build`
   - Verify build completes successfully with output in `dist/pos_portal_app/`
   - Check bundle sizes are reasonable (~396kB initial total for production)

### Common Development Workflow
- **ALWAYS build and test after making changes**: `npm run build && npm test -- --watch=false --browsers=ChromeHeadless`
- **For component changes**: Test the authentication flow validation scenario
- **For service changes**: Pay special attention to auth.service.ts, http.service.ts, and error-handler.service.ts
- **For store changes**: Check auth.store.ts integration with components

## Project Structure and Key Areas

### Critical Files and Directories
```
src/app/
├── components/          # UI components
│   ├── layout/         # Main layout wrapper
│   ├── navbar/         # Navigation bar
│   └── sidebar/        # Side navigation
├── pages/              # Page components
│   ├── dashboard/      # Main dashboard page
│   └── login/          # Authentication page
├── services/           # Business logic services
│   ├── auth.service.ts     # Authentication service
│   ├── http.service.ts     # HTTP client wrapper
│   └── error-handler.service.ts # Error handling
├── stores/             # NgRx signals state management
│   └── auth.store.ts   # Authentication state
├── guards/             # Route guards
│   └── auth.guard.ts   # Authentication guard
├── models/             # TypeScript interfaces
│   └── auth.model.ts   # Authentication models
├── app.routes.ts       # Application routing
└── app.config.ts       # Application configuration
```

### Configuration Files
- `angular.json` - Angular CLI configuration
- `package.json` - Dependencies and scripts  
- `tsconfig.json` - TypeScript configuration
- `src/environments/environment.ts` - Environment configuration (API URL: https://admin.reso.vn/api/v1)
- `.postcssrc.json` - PostCSS configuration for TailwindCSS
- `.editorconfig` - Code formatting rules (2 spaces, single quotes for TS)

### Styling and UI
- **TailwindCSS v4.1.11** with **DaisyUI v5.0.50** for component library
- SCSS support enabled
- Component styles use `.scss` files
- Global styles in `src/styles.scss`

### State Management
- **NgRx signals** (not NgRx store) for reactive state management
- Authentication state managed in `auth.store.ts`
- Services use dependency injection pattern

## Linting and Code Quality
- **No linting tools configured** (no ESLint, Prettier, etc.)
- Follow `.editorconfig` rules: 2 spaces, single quotes for TypeScript
- TypeScript strict mode enabled in `tsconfig.json`
- **No pre-commit hooks or automated formatting**

## Common Pitfalls and Troubleshooting
- **Network errors are expected** when testing login due to external API restrictions
- **One test failure is normal** - the default Angular template test doesn't match the customized template
- **SSR commands will fail** - SSR is not properly configured despite being mentioned in package.json
- **Build warnings about deprecated packages are normal** - run `npm audit fix` to address them
- **Development server takes ~8 seconds for initial build** - this is normal for Angular apps with TailwindCSS

## API Integration
- **Backend API**: https://admin.reso.vn/api/v1
- **Timeout**: 10 seconds (configured in environment.ts)
- **HTTP service**: Custom wrapper in `http.service.ts` using Axios
- **Authentication**: Token-based authentication handled by `auth.service.ts`

## Browser Compatibility
- **Chrome/Chromium required for testing** (Karma uses ChromeHeadless)
- **Modern browser support** due to ES2022 target in TypeScript config
- **No IE support** (Angular 19 requirement)