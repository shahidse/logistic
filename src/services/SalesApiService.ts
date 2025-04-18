import { BaseApiService } from "./BaseApiService";

export class SalesApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }
  private static instance: SalesApiService;
  public static getInstance(apiUrl?: string): SalesApiService {
    if (!SalesApiService.instance) {
      SalesApiService.instance = new SalesApiService(apiUrl);
    }
    return SalesApiService.instance;
  }
  async getSalesById(id: string, options?: RequestInit): Promise<any> {
    return await this.get(`sales/${id}`, options);
  }
  async getCompanies(options?: RequestInit): Promise<any> {
    return await this.get(`sales`, options);
  }
  async createSales(data: any, options?: RequestInit): Promise<any> {
    return await this.post(`sales`, data, options);
  }
  async updateSales(
    id: string,
    data: any,
    options?: RequestInit
  ): Promise<any> {
    return await this.patch(`sales/${id}`, data, options);
  }
  async deleteSales(id: string, options?: RequestInit): Promise<any> {
    return await this.delete(`sales/${id}`, options);
  }
}
