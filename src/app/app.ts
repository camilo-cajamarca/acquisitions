import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent, HeaderComponent, AlertComponent, ConfirmationModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'Gestión de Adquisiciones - ADRES';
}

