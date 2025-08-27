# Docker Build Fix - "dist/ not found" Error

## Issue Description
The error `"dist": not found` occurred when building Docker images through GitHub Actions workflows. The specific error was:

```
#7 [2/3] COPY dist/ /usr/share/nginx/html/
#7 ERROR: failed to calculate checksum of ref: "/dist": not found
```

## Root Cause
The GitHub Actions workflows were creating temporary single-stage Dockerfiles that attempted to copy from local `dist/` directories. However, both frontend and backend `.dockerignore` files exclude the `dist` directory, preventing Docker from accessing these files during the build process.

### Why the Main Dockerfiles Work
The main `Dockerfile` files in `frontend/` and `backend/` directories use **multi-stage builds** with `COPY --from=build`, which copies from the build stage rather than the local context, bypassing the `.dockerignore` restrictions.

### Why the GitHub Actions Workflows Failed
The GitHub Actions workflows generated **single-stage Dockerfiles** that tried to copy directly from the local `dist/` directory, which was excluded by `.dockerignore`.

## Solution Applied
The GitHub Actions workflows now temporarily modify the `.dockerignore` files during the Docker build process:

### Frontend Workflow (`.github/workflows/frontend-ci.yml`)
1. **Backup original `.dockerignore`**: `cp .dockerignore .dockerignore.bak`
2. **Remove dist exclusion**: `grep -v "^dist$" .dockerignore > .dockerignore.tmp && mv .dockerignore.tmp .dockerignore`
3. **Build Docker image** with access to `dist/pos_portal_app/browser/` directory
4. **Restore original `.dockerignore`**: `mv .dockerignore.bak .dockerignore`

### Backend Workflow (`.github/workflows/backend-ci.yml`)
1. **Backup original `.dockerignore`**: `cp .dockerignore .dockerignore.bak`
2. **Remove dist exclusion**: `grep -v "^dist$" .dockerignore > .dockerignore.tmp && mv .dockerignore.tmp .dockerignore`
3. **Build Docker image** with access to `dist/` directory
4. **Restore original `.dockerignore`**: `mv .dockerignore.bak .dockerignore`

## Build Output Paths
- **Frontend**: `npm run build` creates `dist/pos_portal_app/browser/` containing the built Angular application
- **Backend**: `npm run build` creates `dist/` containing the compiled NestJS application

## Testing
Both workflows were tested locally and confirmed to build successfully:
- Frontend Docker image builds correctly using `dist/pos_portal_app/browser/` path
- Backend Docker image builds correctly using `dist/` path
- Original `.dockerignore` files are properly restored after build

## Files Modified
- `.github/workflows/frontend-ci.yml`: Added .dockerignore modification and restoration steps
- `.github/workflows/backend-ci.yml`: Added .dockerignore modification and restoration steps

## Impact
This fix resolves the Docker build failures in GitHub Actions workflows while maintaining the security benefits of `.dockerignore` exclusions for normal development workflows.