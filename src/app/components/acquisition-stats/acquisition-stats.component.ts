import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcquisitionService } from '../../services/acquisition.service';
import { Acquisition } from '../../models/acquisition.model';

interface AcquisitionStats {
  total: number;
  active: number;
  inactive: number;
  totalValue: number;
  totalBudget: number;
}

@Component({
  selector: 'app-acquisition-stats',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <!-- Total Acquisitions -->
      <div class="stat-card bg-gradient-to-br from-primary to-primary-700">
        <div class="stat-icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Adquisiciones</p>
          <p class="stat-value">{{ stats().total }}</p>
        </div>
      </div>

      <!-- Active Acquisitions -->
      <div class="stat-card bg-gradient-to-br from-green-500 to-green-700">
        <div class="stat-icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Activas</p>
          <p class="stat-value">{{ stats().active }}</p>
        </div>
      </div>

      <!-- Inactive Acquisitions -->
      <div class="stat-card bg-gradient-to-br from-red-500 to-red-700">
        <div class="stat-icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Inactivas</p>
          <p class="stat-value">{{ stats().inactive }}</p>
        </div>
      </div>

      <!-- Total Value -->
      <div class="stat-card bg-gradient-to-br from-secondary to-secondary-700">
        <div class="stat-icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Valor Total</p>
          <p class="stat-value text-lg">{{ formatCurrency(stats().totalValue) }}</p>
        </div>
      </div>

      <!-- Total Budget -->
      <div class="stat-card bg-gradient-to-br from-accent to-accent-700">
        <div class="stat-icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Presupuesto Total</p>
          <p class="stat-value text-lg">{{ formatCurrency(stats().totalBudget) }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      @apply rounded-lg shadow-lg p-6 text-white flex items-center gap-4 transition-transform hover:scale-105;
    }
    
    .stat-icon {
      @apply flex-shrink-0 opacity-80;
    }
    
    .stat-content {
      @apply flex-1 min-w-0;
    }
    
    .stat-label {
      @apply text-sm font-medium opacity-90 mb-1;
    }
    
    .stat-value {
      @apply text-2xl font-bold truncate;
    }
  `]
})
export class AcquisitionStatsComponent implements OnInit {
  private acquisitionService = inject(AcquisitionService);

  acquisitions = signal<Acquisition[]>([]);

  stats = computed<AcquisitionStats>(() => {
    const acqs = this.acquisitions();

    return {
      total: acqs.length,
      active: acqs.filter(a => a.isActive).length,
      inactive: acqs.filter(a => !a.isActive).length,
      totalValue: acqs.reduce((sum, a) => sum + a.totalValue, 0),
      totalBudget: acqs.reduce((sum, a) => sum + a.budget, 0)
    };
  });

  ngOnInit(): void {
    this.loadAcquisitions();
  }

  loadAcquisitions(): void {
    this.acquisitionService.getAllAcquisitions().subscribe({
      next: (acquisitions) => {
        this.acquisitions.set(acquisitions);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
