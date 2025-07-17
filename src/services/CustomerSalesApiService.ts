
import { BaseApiService } from "./BaseApiService";

export class CustomerSalesApiService extends BaseApiService {
    private static instance: CustomerSalesApiService;

    constructor(apiUrl?: string) {
        super(apiUrl);
    }

    public static getInstance(apiUrl?: string): CustomerSalesApiService {
        if (!CustomerSalesApiService.instance) {
            CustomerSalesApiService.instance = new CustomerSalesApiService(apiUrl);
        }
        return CustomerSalesApiService.instance;
    }

    async getCustomerSalesId(id: string, options?: RequestInit): Promise<any> {
        return await this.get(`customers-sales/${id}`, options);
    }

    async getCustomerSales(searchParam?: any, options?: RequestInit): Promise<any> {
        const queryString = searchParam ? new URLSearchParams(searchParam).toString() : '';
        const url = queryString ? `customers-sales?${queryString}` : `customers-sales`;
        return await this.get(url, options);
    }

    async createCustomerSales(data: any, options?: RequestInit): Promise<any> {
        return await this.post(`customers-sales`, data, options);
    }

    async updateCustomerSales(id: string, data: any, options?: RequestInit): Promise<any> {
        return await this.patch(`customers-sales/${id}`, data, options);
    }

    async deleteDCustomerSales(id: string, options?: RequestInit): Promise<any> {
        return await this.delete(`customers-sales/${id}`, options);
    }
}