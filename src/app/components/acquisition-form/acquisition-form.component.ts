import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AcquisitionService } from '../../services/acquisition.service';
import { AlertService } from '../../services/alert.service';
import { ConfirmationService } from '../../services/confirmation.service';
import { ValidationErrorComponent } from '../shared/validation-error/validation-error.component';

@Component({
  selector: 'app-acquisition-form',
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorComponent],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-6">
        <button (click)="goBack()" class="text-primary hover:text-primary-700 flex items-center gap-2 mb-4 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver
        </button>
        <h1 class="text-3xl font-bold text-primary">
          {{ isEditMode() ? 'Editar Adquisición' : 'Nueva Adquisición' }}
        </h1>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Budget -->
          <div>
            <label class="label">
              Presupuesto <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              formControlName="budget"
              placeholder="Ej: 10000000"
              [class]="form.get('budget')?.invalid && form.get('budget')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('budget')" />
          </div>

          <!-- Unit -->
          <div>
            <label class="label">
              Unidad Administrativa <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              formControlName="unit"
              placeholder="Ej: Dirección de Medicamentos"
              [class]="form.get('unit')?.invalid && form.get('unit')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('unit')" />
          </div>

          <!-- Service Type -->
          <div class="md:col-span-2">
            <label class="label">
              Tipo de Bien o Servicio <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              formControlName="serviceType"
              placeholder="Ej: Medicamentos"
              [class]="form.get('serviceType')?.invalid && form.get('serviceType')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('serviceType')" />
          </div>

          <!-- Quantity -->
          <div>
            <label class="label">
              Cantidad <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              formControlName="quantity"
              placeholder="Ej: 10000"
              [class]="form.get('quantity')?.invalid && form.get('quantity')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('quantity')" />
          </div>

          <!-- Unit Value -->
          <div>
            <label class="label">
              Valor Unitario <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              formControlName="unitValue"
              placeholder="Ej: 1000"
              [class]="form.get('unitValue')?.invalid && form.get('unitValue')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('unitValue')" />
          </div>

          <!-- Total Value (Read-only, calculated) -->
          <div class="md:col-span-2">
            <label class="label">Valor Total (Calculado automáticamente)</label>
            <div class="input-field bg-gray-100 font-semibold text-primary text-lg">
              {{ formatCurrency(totalValue()) }}
            </div>
          </div>

          <!-- Acquisition Date -->
          <div>
            <label class="label">
              Fecha de Adquisición <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              [max]="maxDate"
              formControlName="acquisitionDate"
              [class]="form.get('acquisitionDate')?.invalid && form.get('acquisitionDate')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('acquisitionDate')" />
          </div>

          <!-- Provider -->
          <div>
            <label class="label">
              Proveedor <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              formControlName="provider"
              placeholder="Ej: Laboratorios Bayer S.A."
              [class]="form.get('provider')?.invalid && form.get('provider')?.touched ? 'input-field input-error' : 'input-field'">
            <app-validation-error [errorMessage]="getErrorMessage('provider')" />
          </div>

          <!-- Documentation -->
          <div class="md:col-span-2">
            <label class="label">
              Documentación <span class="text-red-500">*</span>
            </label>
            <textarea
              formControlName="documentation"
              rows="3"
              placeholder="Ej: Orden de compra No. 2023-07-20-001, factura No. 2023-07-20-001"
              [class]="form.get('documentation')?.invalid && form.get('documentation')?.touched ? 'input-field input-error' : 'input-field'"></textarea>
            <app-validation-error [errorMessage]="getErrorMessage('documentation')" />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            (click)="goBack()"
            class="flex-1 btn-outline">
            Cancelar
          </button>
          <button
            type="submit"
            [disabled]="submitting()"
            class="flex-1 btn-primary">
            @if (submitting()) {
              <span>Guardando...</span>
            } @else {
              <span>{{ isEditMode() ? 'Actualizar' : 'Crear' }} Adquisición</span>
            }
          </button>
        </div>

        @if (form.invalid && form.touched) {
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-800 text-sm font-medium">
              Por favor, corrija los errores en el formulario antes de continuar.
            </p>
          </div>
        }
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AcquisitionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private acquisitionService = inject(AcquisitionService);
  private alertService = inject(AlertService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEditMode = signal(false);
  acquisitionId = signal<number | null>(null);
  submitting = signal(false);
  totalValue = signal(0);
  maxDate = '';

  ngOnInit(): void {
    this.setMaxDate();
    this.initializeForm();
    this.setupValueCalculation();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.acquisitionId.set(+id);
      this.loadAcquisition(+id);
    }
  }

  setMaxDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.maxDate = `${year}-${month}-${day}`;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      budget: [0, [Validators.required, Validators.min(1)]],
      unit: ['', [Validators.required, Validators.maxLength(200)]],
      serviceType: ['', [Validators.required, Validators.maxLength(200)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitValue: [0, [Validators.required, Validators.min(1)]],
      acquisitionDate: ['', [Validators.required, this.futureDateValidator.bind(this)]],
      provider: ['', [Validators.required, Validators.maxLength(200)]],
      documentation: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    // control.value is YYYY-MM-DD string
    if (control.value > this.maxDate) {
      return { futureDate: true };
    }
    return null;
  }

  setupValueCalculation(): void {
    this.form.get('quantity')?.valueChanges.subscribe(() => this.calculateTotal());
    this.form.get('unitValue')?.valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateTotal(): void {
    const quantity = this.form.get('quantity')?.value || 0;
    const unitValue = this.form.get('unitValue')?.value || 0;
    this.totalValue.set(quantity * unitValue);
  }

  loadAcquisition(id: number): void {
    this.acquisitionService.getAcquisitionById(id).subscribe({
      next: (acquisition) => {
        this.form.patchValue({
          budget: acquisition.budget,
          unit: acquisition.unit,
          serviceType: acquisition.serviceType,
          quantity: acquisition.quantity,
          unitValue: acquisition.unitValue,
          acquisitionDate: acquisition.acquisitionDate.split('T')[0],
          provider: acquisition.provider,
          documentation: acquisition.documentation
        });
        this.calculateTotal();
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.confirmationService.confirm({
        title: this.isEditMode() ? 'Actualizar Adquisición' : 'Crear Adquisición',
        message: this.isEditMode()
          ? '¿Está seguro de que desea actualizar esta adquisición?'
          : '¿Está seguro de que desea crear esta nueva adquisición?',
        confirmText: this.isEditMode() ? 'Actualizar' : 'Crear',
        cancelText: 'Cancelar',
        type: 'primary'
      }).subscribe((confirmed) => {
        if (confirmed) {
          this.submitting.set(true);

          const formData = {
            ...this.form.value,
            totalValue: this.totalValue()
          };

          const request = this.isEditMode()
            ? this.acquisitionService.updateAcquisition(this.acquisitionId()!, formData)
            : this.acquisitionService.createAcquisition(formData);

          request.subscribe({
            next: () => {
              this.submitting.set(false);
              this.alertService.success(
                this.isEditMode()
                  ? 'Adquisición actualizada correctamente'
                  : 'Adquisición creada correctamente'
              );
              this.router.navigate(['/acquisitions']);
            },
            error: () => {
              this.submitting.set(false);
              this.alertService.error('Ocurrió un error al guardar la adquisición');
            }
          });
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.alertService.warning('Por favor, complete todos los campos requeridos');
    }
  }

  getErrorMessage(fieldName: string): string | null {
    const control = this.form.get(fieldName);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) {
      return 'Este campo es requerido';
    }

    if (control.errors['min']) {
      return `El valor mínimo es ${control.errors['min'].min}`;
    }

    if (control.errors['maxLength']) {
      return `Máximo ${control.errors['maxLength'].requiredLength} caracteres`;
    }

    if (control.errors['futureDate']) {
      return 'La fecha no puede ser futura';
    }

    return 'Campo inválido';
  }

  goBack(): void {
    this.router.navigate(['/acquisitions']);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }
}
