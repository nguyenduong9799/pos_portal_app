# POS Portal App

This repository contains both the frontend and backend components of the POS Portal application.

## Project Structure

```
pos_portal_app/
├── frontend/          # Angular frontend application
├── backend/           # NestJS API backend
└── README.md         # This file
```

## Frontend (Angular)

The frontend is an Angular application located in the `frontend/` directory.

### Prerequisites

- Node.js (v18 or higher)
- npm

### Development server

To start the frontend development server:

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the frontend project:

```bash
cd frontend
npm run build
```

This will compile your project and store the build artifacts in the `frontend/dist/` directory.

### Running tests

To execute unit tests:

```bash
cd frontend
npm test
```

## Backend (NestJS)

The backend is a NestJS API application located in the `backend/` directory.

### Development server

To start the backend development server:

```bash
cd backend
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000/`. The server will automatically restart when you modify any of the source files.

### Building

To build the backend project:

```bash
cd backend
npm run build
```

### Running tests

To execute unit tests:

```bash
cd backend
npm test
```

To execute end-to-end tests:

```bash
cd backend
npm run test:e2e
```

## Running Both Projects

To run both the frontend and backend simultaneously, open two terminal windows:

1. Terminal 1 (Backend):
```bash
cd backend
npm install
npm run start:dev
```

2. Terminal 2 (Frontend):
```bash
cd frontend
npm install
npm start
```

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [NestJS Documentation](https://docs.nestjs.com/)
