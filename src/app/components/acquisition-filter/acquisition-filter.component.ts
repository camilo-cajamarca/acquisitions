import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-acquisition-filter',
    imports: [CommonModule, FormsModule],
    template: `
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filtros
        </h2>
        @if (hasActiveFilters()) {
          <button (click)="clearFilters()" class="text-sm text-secondary hover:text-secondary-600 font-medium transition-colors">
            Limpiar filtros
          </button>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Search -->
        <div>
          <label class="label">Búsqueda</label>
          <input
            type="text"
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearchChange()"
            placeholder="Buscar..."
            class="input-field">
        </div>

        <!-- Status Filter -->
        <div>
          <label class="label">Estado</label>
          <select
            [(ngModel)]="statusFilter"
            (ngModelChange)="onFilterChange()"
            class="input-field">
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <!-- Date From -->
        <div>
          <label class="label">Fecha desde</label>
          <input
            type="date"
            [(ngModel)]="dateFrom"
            (ngModelChange)="onFilterChange()"
            class="input-field">
        </div>

        <!-- Date To -->
        <div>
          <label class="label">Fecha hasta</label>
          <input
            type="date"
            [(ngModel)]="dateTo"
            (ngModelChange)="onFilterChange()"
            class="input-field">
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class AcquisitionFilterComponent {
    filterChange = output<any>();
    searchChange = output<string>();

    searchValue = signal('');
    statusFilter = signal('all');
    dateFrom = signal('');
    dateTo = signal('');

    private searchTimeout: any;

    onSearchChange(): void {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.searchChange.emit(this.searchValue());
        }, 500); // Debounce 500ms
    }

    onFilterChange(): void {
        this.filterChange.emit({
            status: this.statusFilter(),
            dateFrom: this.dateFrom(),
            dateTo: this.dateTo()
        });
    }

    clearFilters(): void {
        this.searchValue.set('');
        this.statusFilter.set('all');
        this.dateFrom.set('');
        this.dateTo.set('');
        this.searchChange.emit('');
        this.onFilterChange();
    }

    hasActiveFilters(): boolean {
        return this.searchValue() !== '' ||
            this.statusFilter() !== 'all' ||
            this.dateFrom() !== '' ||
            this.dateTo() !== '';
    }
}
