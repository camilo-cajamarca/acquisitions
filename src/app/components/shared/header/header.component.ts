import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <header class="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <!-- Logo Placeholder / Icon -->
          <div class="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-inner">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          
          <div class="flex flex-col">
            <h1 class="text-xl md:text-2xl font-bold tracking-tight">
              Gestor de Adquisiciones
            </h1>
            <span class="text-xs text-secondary font-medium tracking-wider">ADRES</span>
          </div>
        </div>

        <!-- Optional: User Profile / Actions could go here -->
        <div class="hidden md:flex items-center gap-4">
          <span class="text-sm text-gray-300">v1.0.0</span>
        </div>
      </div>
      
      <!-- Decorative bottom border -->
      <div class="h-1 bg-gradient-to-r from-secondary via-accent to-secondary"></div>
    </header>
  `
})
export class HeaderComponent { }
