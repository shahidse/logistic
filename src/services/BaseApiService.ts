// services/baseApiService.ts
export class BaseApiService {
  protected apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }

  // Helper function to handle fetch requests with 401 handling
  private async request(
    method: string,
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<any> {
    try {
      console.log('data', data)
      const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        // ...options,
      });

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = "/"; // Redirect user to login page
        return new Error(`Session Expires`);
      }

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          errorMessage.message || `Error: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Base API ${method} Error:`, error);
      throw error;
    }
  }

  // GET Request
  protected async get(endpoint: string, options?: RequestInit) {
    return this.request("GET", endpoint, undefined, options);
  }

  // POST Request
  protected async post(endpoint: string, data: any, options?: RequestInit) {
    return await this.request("POST", endpoint, data, options);
  }

  // PUT Request
  protected async put(endpoint: string, data: any, options?: RequestInit) {
    return this.request("PUT", endpoint, data, options);
  }

  // DELETE Request
  protected async delete(endpoint: string, options?: RequestInit) {
    return this.request("DELETE", endpoint, undefined, options);
  }

  // PATCH Request
  protected async patch(endpoint: string, data: any, options?: RequestInit) {
    return this.request("PATCH", endpoint, data, options);
  }
}
