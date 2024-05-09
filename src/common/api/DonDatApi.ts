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

    public static postLuuPhong<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/phong-dat/add`, body);
    }

    public static postCheckIn<T = any>(id: any) {
        return axios.post<T>(`${this.baseApi}/phong-dat/checkin?id=${id}`);
    }

    public static getChiTietPhong<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/staff/phong-dat/chi-tiet-tung-phong/${id}`);
    }

    public static postDoiPhong<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/phong-dat/doi-phong`, body);
    }

    public static addKhachO<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/khach-hang-o/add`, body);
    }

    public static updateKhachO<T = any>(id: any, body : any) {
        return axios.post<T>(`${this.baseApi}/admin/khach-hang-o/update/${id}`,body);
    }

    public static detailKhachO<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/khach-hang-o/detail/${id}`);
    }

    public static deleteKhachO<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}/admin/khach-hang-o/delete/${id}`);
    }

    public static postCheckOut<T = any>(idDonDat: any, idPhongDat:any) {
        return axios.post<T>(`${this.baseApi}/phong-dat/checkout?idDonDat=${idDonDat}&idPhongDat=${idPhongDat}`);
    }

    public static locTheoDichVu<T = any>(id: any) {
        
        return axios.get<T>(`${this.baseApi}/admin/dich-vu/loc-theo-loai-dich-vu/${id ? ('?id='+id) : '' }`);
    }

    public static getAllDichVu<T = any>() {
        return axios.get<T>(`${this.baseApi}/admin/loai-dich-vu/hien-thi`);
    }

    public static addDichVu<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/dich-vu-dat/add`, body);
    }

    public static deleteDichVu<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}/admin/dich-vu-dat/delete/${id}`);
    }

    public static getHoaDon<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/hoa-don-phong/${id}`);
    }

    public static getHinhThucThanhToan<T = any>() {
        return axios.get<T>(`${this.baseApi}/httt`);
    }
   

    public static addHoaDon<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/hoa-don-phong/add`, body);
    }

    public static inHoaDon<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/hoa-don-phong/chi-tiet/${id}`);
    }


}