import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, Alert, AlertType } from '../../../services/alert.service';

@Component({
    selector: 'app-alert',
    imports: [CommonModule],
    template: `
    <div class="fixed top-20 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      @for (alert of alertService.alerts(); track alert.id) {
        <div 
          class="pointer-events-auto transform transition-all duration-300 ease-in-out animate-slide-in"
          [ngClass]="getAlertClass(alert.type)">
          
          <div class="flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 bg-white">
            <!-- Icon -->
            <div class="flex-shrink-0">
              @switch (alert.type) {
                @case ('success') {
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                }
                @case ('error') {
                  <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                }
                @case ('warning') {
                  <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                }
                @case ('info') {
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                }
              }
            </div>

            <!-- Content -->
            <div class="flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ alert.message }}
              </p>
            </div>

            <!-- Close Button -->
            <button 
              (click)="alertService.remove(alert.id)"
              class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      }
    </div>
  `,
    styles: [`
    .animate-slide-in {
      animation: slideIn 0.3s ease-out forwards;
    }
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class AlertComponent {
    alertService = inject(AlertService);

    getAlertClass(type: AlertType): string {
        switch (type) {
            case 'success': return 'border-green-500';
            case 'error': return 'border-red-500';
            case 'warning': return 'border-yellow-500';
            case 'info': return 'border-blue-500';
            default: return 'border-gray-500';
        }
    }
}
