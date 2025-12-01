import { Routes } from '@angular/router';
import { AcquisitionListComponent } from './components/acquisition-list/acquisition-list.component';
import { AcquisitionFormComponent } from './components/acquisition-form/acquisition-form.component';
import { AcquisitionHistoryComponent } from './components/acquisition-history/acquisition-history.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/acquisitions',
        pathMatch: 'full'
    },
    {
        path: 'acquisitions',
        component: AcquisitionListComponent
    },
    {
        path: 'acquisitions/new',
        component: AcquisitionFormComponent
    },
    {
        path: 'acquisitions/:id/edit',
        component: AcquisitionFormComponent
    },
    {
        path: 'acquisitions/:id/history',
        component: AcquisitionHistoryComponent
    },
    {
        path: '**',
        redirectTo: '/acquisitions'
    }
];
