import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-error',
  imports: [CommonModule],
  template: `
    @if (errorMessage()) {
      <div class="mt-1 flex items-start gap-2 text-red-700 text-sm bg-red-50 border border-red-200 rounded-md p-2 animate-slide-up">
        <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span class="font-medium">{{ errorMessage() }}</span>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ValidationErrorComponent {
  errorMessage = input<string | null>(null);
}
