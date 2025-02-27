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
    return await this.get(`companies/${id}`);
  }
  async getCompanies(): Promise<any> {
    return await this.get(`companies`);
  }
  async createCompany(data: any): Promise<any> {
    return await this.post(`companies`, data);
  }
  async updateCompany(id: string, data: any): Promise<any> {
    return await this.put(`companies/${id}`, data);
  }
  async deleteCompany(id: string): Promise<any> {
    return await this.delete(`companies/${id}`);
  }
}
