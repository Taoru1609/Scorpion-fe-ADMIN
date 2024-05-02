import axios from "axios";
import { HttpClient } from "./HttpClient";

export class RoomTypeApi extends HttpClient {
    protected static override prefix: string = "/admin";

    public static getRoom<T = any>(params: any = null) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/phong/hien-thi`, { params });
    }

  public static searchPriceRoom<T = any>(price: any) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/loai-phong/tim-kiem-theo-gia/${price}`);
    }

    public static createRoom<T = any>(data: any) {
        return axios.post<T>(`${this.baseApi}${this.prefix}/phong-dat/admin/phong/add`, data);
    }

    public static updateRoom<T = any>(id: any) {
        return axios.put<T>(`${this.baseApi}${this.prefix}/staff/phong-datphong/sua/${id}`);
    }

    public static deleteRoom<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}${this.prefix}/admin/phong/phong/xoa/${id}`);
    }


}