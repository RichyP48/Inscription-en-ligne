import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle authentication errors
      if (error.status === 401 || 
          (error.status === 0 && error.url?.includes('oauth2/authorization'))) {
        // Token expired or invalid - clear auth data and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
