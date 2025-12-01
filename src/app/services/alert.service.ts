import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
    id: string;
    type: AlertType;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    alerts = signal<Alert[]>([]);

    success(message: string): void {
        this.addAlert('success', message);
    }

    error(message: string): void {
        this.addAlert('error', message);
    }

    info(message: string): void {
        this.addAlert('info', message);
    }

    warning(message: string): void {
        this.addAlert('warning', message);
    }

    remove(id: string): void {
        this.alerts.update(alerts => alerts.filter(x => x.id !== id));
    }

    private addAlert(type: AlertType, message: string): void {
        const id = this.generateId();
        const alert: Alert = { id, type, message };

        this.alerts.update(alerts => [...alerts, alert]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.remove(id);
        }, 5000);
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}
