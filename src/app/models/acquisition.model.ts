export interface Acquisition {
    id: number;
    budget: number;
    unit: string;
    serviceType: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
    acquisitionDate: string;
    provider: string;
    documentation: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AcquisitionHistory {
    id: number;
    acquisitionId: number;
    budget: number;
    unit: string;
    serviceType: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
    acquisitionDate: string;
    provider: string;
    documentation: string;
    changeDate: string;
    changeType: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface CreateAcquisitionDto {
    budget: number;
    unit: string;
    serviceType: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
    acquisitionDate: string;
    provider: string;
    documentation: string;
}

export interface UpdateAcquisitionDto {
    budget: number;
    unit: string;
    serviceType: string;
    quantity: number;
    unitValue: number;
    acquisitionDate: string;
    provider: string;
    documentation: string;
}
