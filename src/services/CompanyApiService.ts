import { BaseApiService } from "./BaseApiService";

export class CompanyApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }
  private static instance: CompanyApiService;
  public static getInstance(apiUrl?: string): CompanyApiService {
    if (!CompanyApiService.instance) {
      CompanyApiService.instance = new CompanyApiService(apiUrl);
    }
    return CompanyApiService.instance;
  }
  async getCompanyById(id: string): Promise<any> {
    return await this.get(`company/${id}`);
  }
  async getCompanies(options?: RequestInit): Promise<any> {
    return await this.get(`company`, options);
  }
  async createCompany(data: any, options?: RequestInit): Promise<any> {
    return await this.post(`company`, data, options);
  }
  async updateCompany(id: string, data: any): Promise<any> {
    return await this.put(`company/${id}`, data);
  }
  async deleteCompany(id: string): Promise<any> {
    return await this.delete(`company/${id}`);
  }
}
