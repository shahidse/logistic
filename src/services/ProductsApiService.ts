import { BaseApiService } from "./BaseApiService";

export class ProductsApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }
  private static instance: ProductsApiService;
  public static getInstance(apiUrl?: string): ProductsApiService {
    if (!ProductsApiService.instance) {
      ProductsApiService.instance = new ProductsApiService(apiUrl);
    }
    return ProductsApiService.instance;
  }
  async getProductsById(id: string, options?: RequestInit): Promise<any> {
    return await this.get(`products/${id}`, options);
  }
  async getCompanies(options?: RequestInit): Promise<any> {
    return await this.get(`products`, options);
  }
  async createProducts(data: any, options?: RequestInit): Promise<any> {
    return await this.post(`products`, data, options);
  }
  async updateProducts(
    id: string,
    data: any,
    options?: RequestInit
  ): Promise<any> {
    return await this.put(`products/${id}`, data, options);
  }
  async deleteProducts(id: string, options?: RequestInit): Promise<any> {
    return await this.delete(`products/${id}`, options);
  }
}
