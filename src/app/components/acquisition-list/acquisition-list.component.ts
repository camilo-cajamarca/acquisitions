import { Component, OnInit, inject, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcquisitionService } from '../../services/acquisition.service';
import { Acquisition, PaginatedResponse } from '../../models/acquisition.model';
import { AcquisitionFilterComponent } from '../acquisition-filter/acquisition-filter.component';
import { AlertService } from '../../services/alert.service';
import { ConfirmationService } from '../../services/confirmation.service';
import { AcquisitionStatsComponent } from '../acquisition-stats/acquisition-stats.component';

@Component({
    selector: 'app-acquisition-list',
    imports: [CommonModule, AcquisitionFilterComponent, AcquisitionStatsComponent],
    templateUrl: './acquisition-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcquisitionListComponent implements OnInit {
    private acquisitionService = inject(AcquisitionService);
    private alertService = inject(AlertService);
    private confirmationService = inject(ConfirmationService);
    private router = inject(Router);

    @ViewChild(AcquisitionStatsComponent) statsComponent!: AcquisitionStatsComponent;

    acquisitions = signal<Acquisition[]>([]);
    loading = signal(false);
    currentPage = signal(1);
    pageSize = signal(10);
    totalCount = signal(0);
    totalPages = signal(0);
    searchTerm = signal('');
    Math = Math;

    ngOnInit(): void {
        this.loadAcquisitions();
    }

    loadAcquisitions(): void {
        this.loading.set(true);
        this.acquisitionService
            .getAcquisitions(this.currentPage(), this.pageSize(), this.searchTerm())
            .subscribe({
                next: (response: PaginatedResponse<Acquisition>) => {
                    this.acquisitions.set(response.items);
                    this.totalCount.set(response.totalCount);
                    this.totalPages.set(response.totalPages);
                    this.loading.set(false);
                },
                error: () => {
                    this.loading.set(false);
                }
            });
    }

    onFilterChange(filters: any): void {
        this.currentPage.set(1);
        this.loadAcquisitions();
    }

    onSearchChange(searchTerm: string): void {
        this.searchTerm.set(searchTerm);
        this.currentPage.set(1);
        this.loadAcquisitions();
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages()) {
            this.currentPage.set(page);
            this.loadAcquisitions();
        }
    }

    getPageNumbers(): number[] {
        const pages: number[] = [];
        const total = this.totalPages();
        const current = this.currentPage();

        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push(-1);
                pages.push(total);
            } else if (current >= total - 3) {
                pages.push(1);
                pages.push(-1);
                for (let i = total - 4; i <= total; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push(-1);
                for (let i = current - 1; i <= current + 1; i++) pages.push(i);
                pages.push(-1);
                pages.push(total);
            }
        }

        return pages;
    }

    toggleStatus(id: number): void {
        this.confirmationService.confirm({
            title: 'Confirmar acción',
            message: '¿Está seguro de cambiar el estado de esta adquisición?',
            confirmText: 'Sí, cambiar',
            cancelText: 'Cancelar',
            type: 'primary'
        }).subscribe((confirmed) => {
            if (confirmed) {
                this.acquisitionService.toggleAcquisitionStatus(id).subscribe({
                    next: () => {
                        this.alertService.success('Estado de la adquisición actualizado correctamente');
                        this.loadAcquisitions();
                        this.statsComponent.loadAcquisitions();
                    },
                    error: () => {
                        this.alertService.error('Error al actualizar el estado de la adquisición');
                    }
                });
            }
        });
    }

    navigateToCreate(): void {
        this.router.navigate(['/acquisitions/new']);
    }

    navigateToEdit(id: number): void {
        this.router.navigate([`/acquisitions/${id}/edit`]);
    }

    navigateToHistory(id: number): void {
        this.router.navigate([`/acquisitions/${id}/history`]);
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value);
    }
}
