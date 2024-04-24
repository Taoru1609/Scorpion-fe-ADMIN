import axios from "./HttpConfig";

export class HttpClient {
  protected static baseApi: string = "http://localhost:8080";

  protected static prefix: string = "";

  public static getPaging<T = any>(params: any = null) {
    return axios.get<T>(`${this.prefix}/get-paging`, { params });
  }

  public static getCombobox<T = any>(params: any = null) {
    return axios.get<T>(`${this.prefix}/options`, { params });
  }

  public static findOne<T = any>(id: any) {
    return axios.get<T>(`${this.prefix}/find`, { params: { id: id } });
  }

  public static add<T = any>(body: any = null) {
    return axios.post<T>(`${this.prefix}/add`, body);
  }

  public static edit<T = any>(id: string, body: any = null) {
    return axios.post<T>(`${this.prefix}/edit`, body);
  }

  public static delete<T = any>(id: any) {
    return axios.get<T>(`${this.prefix}/delete`, { params: { id: id } });
  }
}
