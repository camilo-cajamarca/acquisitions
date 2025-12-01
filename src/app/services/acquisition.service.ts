import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
    Acquisition,
    AcquisitionHistory,
    PaginatedResponse,
    CreateAcquisitionDto,
    UpdateAcquisitionDto
} from '../models/acquisition.model';

@Injectable({
    providedIn: 'root'
})
export class AcquisitionService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/Acquisitions`;

    getAcquisitions(
        pageNumber: number = 1,
        pageSize: number = 10,
        searchTerm: string = ''
    ): Observable<PaginatedResponse<Acquisition>> {
        let params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString());

        if (searchTerm) {
            params = params.set('searchTerm', searchTerm);
        }

        return this.http.get<PaginatedResponse<Acquisition>>(this.apiUrl, { params });
    }

    getAllAcquisitions(): Observable<Acquisition[]> {
        return this.http.get<Acquisition[]>(`${this.apiUrl}/all`);
    }

    getAcquisitionById(id: number): Observable<Acquisition> {
        return this.http.get<Acquisition>(`${this.apiUrl}/${id}`);
    }

    createAcquisition(data: CreateAcquisitionDto): Observable<Acquisition> {
        return this.http.post<Acquisition>(this.apiUrl, data);
    }

    updateAcquisition(id: number, data: UpdateAcquisitionDto): Observable<Acquisition> {
        return this.http.put<Acquisition>(`${this.apiUrl}/${id}`, data);
    }

    toggleAcquisitionStatus(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getAcquisitionHistory(id: number): Observable<AcquisitionHistory[]> {
        return this.http.get<AcquisitionHistory[]>(`${this.apiUrl}/${id}/history`);
    }
}
