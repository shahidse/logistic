import { BaseApiService } from "./BaseApiService";

export class InventoryApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  private static instance: InventoryApiService;

  public static getInstance(apiUrl?: string): InventoryApiService {
    if (!InventoryApiService.instance) {
      InventoryApiService.instance = new InventoryApiService(apiUrl);
    }
    return InventoryApiService.instance;
  }

  async getInventoryById(id: string, options?: RequestInit): Promise<any> {
    return await this.get(`inventory/${id}`, options);
  }

  async getInventories(searchParam?: any, options?: RequestInit): Promise<any> {
    const queryString = new URLSearchParams(searchParam).toString();
    const url = queryString ? `inventory?${queryString}` : `inventory`;
    return await this.get(url, options);
  }

  async createInventory(data: any, options?: RequestInit): Promise<any> {
    return await this.post(`inventory`, data, options);
  }

  async updateInventory(
    id: string,
    data: any,
    options?: RequestInit
  ): Promise<any> {
    return await this.patch(`inventory/${id}`, data, options);
  }

  async deleteInventory(id: string, options?: RequestInit): Promise<any> {
    return await this.delete(`inventory/${id}`, options);
  }
}
