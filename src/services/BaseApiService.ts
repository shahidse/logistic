// services/baseApiService.ts
export class BaseApiService {
  protected apiUrl: any;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // GET Request to the backend API
  protected async get(endpoint: string, options?: RequestInit): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Base API GET Error:", error);
      throw error;
    }
  }

  // POST Request to the backend API
  protected async post(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<any> {
    try {
      const response: any = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(data), // Convert the payload to JSON
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(`${message.message}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // PUT Request to the backend API (used for updating resources)
  protected async put(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Base API PUT Error:", error);
      throw error;
    }
  }

  // DELETE Request to the backend API
  protected async delete(
    endpoint: string,
    options?: RequestInit
  ): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Base API DELETE Error:", error);
      throw error;
    }
  }

  // PATCH Request to the backend API (used for partially updating resources)
  protected async patch(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Base API PATCH Error:", error);
      throw error;
    }
  }
}
