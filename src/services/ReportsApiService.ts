import { BaseApiService } from "./BaseApiService";

export class ReportsApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }
  private static instance: ReportsApiService;
  public static getInstance(apiUrl?: string): ReportsApiService {
    if (!ReportsApiService.instance) {
      ReportsApiService.instance = new ReportsApiService(apiUrl);
    }
    return ReportsApiService.instance;
  }

  async getReport(searchParam?: any, options?: RequestInit): Promise<any> {
    const queryString = new URLSearchParams(searchParam).toString();
    const url = `reports${queryString ? `?${queryString}` : ""}`;
    return await this.get(url, options);
  }
}
