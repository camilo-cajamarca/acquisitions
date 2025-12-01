import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, retry, timer } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);

    loadingService.show();

    return next(req).pipe(
        retry({
            count: 3,
            delay: (error: HttpErrorResponse, retryCount: number) => {
                // Only retry on network errors or 5xx server errors
                if (error.status === 0 || error.status >= 500) {
                    // Exponential backoff: 1s, 2s, 4s
                    const delayMs = Math.pow(2, retryCount - 1) * 1000;
                    console.log(`Retrying request (attempt ${retryCount}/3) after ${delayMs}ms...`);
                    return timer(delayMs);
                }
                // Don't retry on client errors (4xx)
                throw error;
            }
        }),
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ha ocurrido un error inesperado';

            if (error.status === 0) {
                errorMessage = 'No se puede conectar con el servidor. Verifique su conexión a internet.';
            } else if (error.status === 404) {
                errorMessage = 'El recurso solicitado no fue encontrado.';
            } else if (error.status === 400) {
                errorMessage = error.error?.message || 'Los datos enviados no son válidos.';
            } else if (error.status === 500) {
                errorMessage = 'Error interno del servidor. Por favor, intente más tarde.';
            } else if (error.error?.message) {
                errorMessage = error.error.message;
            }

            console.error('HTTP Error:', error);
            alert(errorMessage); // Simple alert for now, can be replaced with a toast service

            throw error;
        }),
        finalize(() => {
            loadingService.hide();
        })
    );
};
