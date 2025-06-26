import { BaseApiService } from "./BaseApiService";
export class UserApiService extends BaseApiService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }
  private static instance: UserApiService;
  public static getInstance(apiUrl?: string): UserApiService {
    if (!UserApiService.instance) {
      UserApiService.instance = new UserApiService(apiUrl);
    }
    return UserApiService.instance;
  }
  async getSecretToken(data: any): Promise<any> {
    return await this.post(`users/secret`, data);
  }
  async signUp(data: any, options?: RequestInit) {
    return await this.post("users/signup", data, options);
  }
  async logIn(data: any, options?: RequestInit) {
    const res = await this.post("users/login", data, options);
    return res
  }
  async createClient(data: any, options?: RequestInit) {
    return await this.post(`clients`, data, options);
  }
  async getClients(options?: RequestInit) {
    return await this.get(`clients`, options);
  }
  async updateClient(id: any, data: any, options?: RequestInit) {
    return await this.put(`clients/${id}`, data, options);
  }
  async deleteClient(id: any, options?: RequestInit) {
    return await this.delete(`clients/${id}`, options);
  }
  async getClientById(id: any, options?: RequestInit) {
    return await this.get(`clients/${id}`, options);
  }
  async getRoles(options?: RequestInit) {
    return await this.get("users/roles", options);
  }
}
