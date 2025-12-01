import { Injectable, signal } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ConfirmationOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'primary' | 'warning';
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    private _options = signal<ConfirmationOptions | null>(null);
    private _isOpen = signal(false);
    private _confirmationSubject = new Subject<boolean>();

    get options() { return this._options; }
    get isOpen() { return this._isOpen; }

    confirm(options: ConfirmationOptions): Observable<boolean> {
        this._options.set({
            confirmText: 'Aceptar',
            cancelText: 'Cancelar',
            type: 'primary',
            ...options
        });
        this._isOpen.set(true);
        this._confirmationSubject = new Subject<boolean>();
        return this._confirmationSubject.asObservable();
    }

    resolve(result: boolean): void {
        this._isOpen.set(false);
        this._confirmationSubject.next(result);
        this._confirmationSubject.complete();
    }
}
