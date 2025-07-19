import { Injectable } from '@angular/core';

export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: any): ErrorResponse {
    let errorMessage = 'An unexpected error occurred';
    let status = 0;

    if (error.response) {
      // Server responded with error status
      status = error.response.status;
      
      switch (status) {
        case 400:
          errorMessage = 'Bad Request: Please check your input';
          break;
        case 401:
          errorMessage = 'Unauthorized: Please login again';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource was not found';
          break;
        case 422:
          errorMessage = 'Validation Error: Please check your input';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        default:
          errorMessage = error.response.data?.message || 'Server Error';
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network Error: Please check your internet connection';
      status = 0;
    } else {
      // Other error
      errorMessage = error.message || 'An unexpected error occurred';
    }

    const errorResponse: ErrorResponse = {
      message: errorMessage,
      status: status,
      timestamp: new Date()
    };

    console.error('Error occurred:', errorResponse);
    return errorResponse;
  }

  isNetworkError(error: any): boolean {
    return !error.response && error.request;
  }

  isServerError(error: any): boolean {
    return error.response && error.response.status >= 500;
  }

  isClientError(error: any): boolean {
    return error.response && error.response.status >= 400 && error.response.status < 500;
  }
}
