import axios from "axios";
import { HttpClient } from "./HttpClient";

export class DonDatApi extends HttpClient {
    protected static override prefix: string = "/admin/phong";

    public static getPhongTrong<T = any>(params: any = null) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/phong-trong`, { params });
    }

    public static getPhongDangO<T = any>(params: any = null) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/phong-dang-o`, { params });
    }
}