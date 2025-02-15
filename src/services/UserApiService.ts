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
}
