import { BaseApiService } from "./BaseApiService";

export class DistributionsApiService extends BaseApiService {
    private static instance: DistributionsApiService;

    constructor(apiUrl?: string) {
        super(apiUrl);
    }

    public static getInstance(apiUrl?: string): DistributionsApiService {
        if (!DistributionsApiService.instance) {
            DistributionsApiService.instance = new DistributionsApiService(apiUrl);
        }
        return DistributionsApiService.instance;
    }

    async getDistributionById(id: string, options?: RequestInit): Promise<any> {
        return await this.get(`distributions/${id}`, options);
    }

    async getDistributions(searchParam?: any, options?: RequestInit): Promise<any> {
        const queryString = searchParam ? new URLSearchParams(searchParam).toString() : '';
        const url = queryString ? `distributions?${queryString}` : `distributions`;
        return await this.get(url, options);
    }

    async createDistribution(data: any, options?: RequestInit): Promise<any> {
        return await this.post(`distributions`, data, options);
    }

    async updateDistribution(id: string, data: any, options?: RequestInit): Promise<any> {
        return await this.patch(`distributions/${id}`, data, options);
    }

    async deleteDistribution(id: string, options?: RequestInit): Promise<any> {
        return await this.delete(`distributions/${id}`, options);
    }
}