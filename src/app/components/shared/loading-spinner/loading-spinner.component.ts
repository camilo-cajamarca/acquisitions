import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'app-loading-spinner',
    template: `
    @if (loadingService.isLoading()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm animate-fade-in">
        <div class="relative">
          <!-- Outer ring -->
          <div class="w-20 h-20 border-4 border-secondary-200 rounded-full"></div>
          
          <!-- Spinning ring -->
          <div class="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-secondary border-r-secondary rounded-full animate-spin"></div>
          
          <!-- Inner pulsing circle -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-secondary rounded-full animate-pulse-slow opacity-75"></div>
          
          <!-- Loading text -->
          <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <p class="text-white font-medium text-sm">Cargando...</p>
          </div>
        </div>
      </div>
    }
  `,
    styles: [`
    :host {
      display: contents;
    }
  `]
})
export class LoadingSpinnerComponent {
    loadingService = inject(LoadingService);
}
