import axios from "axios";
import { HttpClient } from "./HttpClient";

export class AuthHttp extends HttpClient {
    protected static override prefix: string = "admin";

    public static login<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/${this.prefix}/login`, body);
    }
}