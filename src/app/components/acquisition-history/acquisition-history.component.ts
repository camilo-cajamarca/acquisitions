import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AcquisitionService } from '../../services/acquisition.service';
import { AcquisitionHistory } from '../../models/acquisition.model';

@Component({
    selector: 'app-acquisition-history',
    imports: [CommonModule],
    template: `
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-6">
        <button (click)="goBack()" class="text-primary hover:text-primary-700 flex items-center gap-2 mb-4 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver
        </button>
        <h1 class="text-3xl font-bold text-primary">Historial de Cambios</h1>
        <p class="text-gray-600 mt-2">Adquisición ID: {{ acquisitionId() }}</p>
      </div>

      @if (loading()) {
        <div class="text-center py-12">
          <p class="text-gray-500">Cargando historial...</p>
        </div>
      } @else if (history().length === 0) {
        <div class="card text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Sin historial</h3>
          <p class="text-gray-500">No hay cambios registrados para esta adquisición</p>
        </div>
      } @else {
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-accent to-primary"></div>

          <div class="space-y-8">
            @for (item of history(); track item.id) {
              <div class="relative pl-20 animate-slide-up">
                <!-- Timeline dot -->
                <div class="absolute left-6 top-6 w-4 h-4 rounded-full bg-white border-4 border-secondary shadow-lg"></div>

                <div class="card hover:shadow-xl transition-shadow">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <span [class]="getChangeTypeBadgeClass(item.changeType)">
                        {{ getChangeTypeLabel(item.changeType) }}
                      </span>
                      <p class="text-sm text-gray-500 mt-1">
                        {{ formatDate(item.changeDate) }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-xs text-gray-500 mb-1">Presupuesto</p>
                      <p class="font-medium">{{ formatCurrency(item.budget) }}</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Unidad</p>
                      <p class="font-medium">{{ item.unit }}</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Tipo de Servicio</p>
                      <p class="font-medium">{{ item.serviceType }}</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Proveedor</p>
                      <p class="font-medium">{{ item.provider }}</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Cantidad</p>
                      <p class="font-medium">{{ item.quantity }} unidades</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Valor Unitario</p>
                      <p class="font-medium">{{ formatCurrency(item.unitValue) }}</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Valor Total</p>
                      <p class="font-semibold text-primary text-lg">{{ formatCurrency(item.totalValue) }}</p>
                    </div>

                    <div>
                      <p class="text-xs text-gray-500 mb-1">Fecha de Adquisición</p>
                      <p class="font-medium">{{ formatDate(item.acquisitionDate) }}</p>
                    </div>

                    <div class="md:col-span-2">
                      <p class="text-xs text-gray-500 mb-1">Documentación</p>
                      <p class="font-medium text-sm">{{ item.documentation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class AcquisitionHistoryComponent implements OnInit {
    private acquisitionService = inject(AcquisitionService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    history = signal<AcquisitionHistory[]>([]);
    loading = signal(false);
    acquisitionId = signal<number | null>(null);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.acquisitionId.set(+id);
            this.loadHistory(+id);
        }
    }

    loadHistory(id: number): void {
        this.loading.set(true);
        this.acquisitionService.getAcquisitionHistory(id).subscribe({
            next: (data) => {
                this.history.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    getChangeTypeLabel(changeType: string): string {
        const labels: { [key: string]: string } = {
            'Created': 'Creación',
            'Updated': 'Actualización',
            'Deleted': 'Eliminación',
            'Activated': 'Activación',
            'Deactivated': 'Desactivación'
        };
        return labels[changeType] || changeType;
    }

    getChangeTypeBadgeClass(changeType: string): string {
        const baseClass = 'badge ';
        const classes: { [key: string]: string } = {
            'Created': 'bg-green-100 text-green-800',
            'Updated': 'bg-blue-100 text-blue-800',
            'Deleted': 'bg-red-100 text-red-800',
            'Activated': 'bg-green-100 text-green-800',
            'Deactivated': 'bg-gray-100 text-gray-800'
        };
        return baseClass + (classes[changeType] || 'bg-gray-100 text-gray-800');
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value);
    }

    goBack(): void {
        this.router.navigate(['/acquisitions']);
    }
}
