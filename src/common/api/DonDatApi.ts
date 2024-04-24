import axios from "axios";
import { HttpClient } from "./HttpClient";

export class DonDatApi extends HttpClient {
    protected static override prefix: string = "/staff/don-dat";

    public static getAll<T = any>(params: any = null) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/hien-thi-tat-ca`, { params });
    }

  public static getOne<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/thong-tin-phong-dat/${id}`);
    }

    public static getPhongDat<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/phong-dat/load/${id}`);
    }

    public static getDetailPhongDat<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/staff/phong-dat/detail-id-phong-dat/${id}`);
    }

    public static getChonPhong<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/phong/searchTrong/${id}`);
    }
}