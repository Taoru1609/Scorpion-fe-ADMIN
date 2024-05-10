import axios from "axios";
import { HttpClient } from "./HttpClient";

export class DonDatApi extends HttpClient {
    protected static override prefix: string = "/staff/don-dat";

    public static getAll<T = any>(params: any = null) {
        return axios.get<T>(`${this.baseApi}${this.prefix}`, { params });
    }

    //api phòng đặt
    public static getOne<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}${this.prefix}/thong-tin-phong-dat/${id}`);
    }

    public static getPhongDat<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/phong-dat/load/${id}`);
    }

    public static getChonPhong<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/phong/searchTrong/${id}`);
    }

    public static getDetailPhongDat<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/staff/phong-dat/detail-id-phong-dat/${id}`);
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

//api khách ở
    public static addKhachO<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/khach-hang-o/add`, body);
    }

    public static updateKhachO<T = any>(id: any, body: any) {
        return axios.post<T>(`${this.baseApi}/admin/khach-hang-o/update/${id}`, body);
    }

    public static detailKhachO<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/khach-hang-o/detail/${id}`);
    }

    public static deleteKhachO<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}/admin/khach-hang-o/delete/${id}`);
    }
    
    //api check out
    public static postCheckOut<T = any>(idDonDat: any, idPhongDat: any) {
        return axios.post<T>(`${this.baseApi}/phong-dat/checkout?idDonDat=${idDonDat}&idPhongDat=${idPhongDat}`);
    }


    //api dịch vụ đặt
    public static addDatDichVu<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/dich-vu-dat/add`, body);
    }

    public static deleteDichVu<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}/admin/dich-vu-dat/delete/${id}`);
    }
    //api hóa  đơn phòng
    public static getHoaDon<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/hoa-don-phong/${id}`);
    }

    public static addHoaDon<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/hoa-don-phong/add`, body);
    }

    public static inHoaDon<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/hoa-don-phong/chi-tiet/${id}`);
    }

    public static getHinhThucThanhToan<T = any>() {
        return axios.get<T>(`${this.baseApi}/httt`);
    }

    //api loại phòng
    public static getLoaiPhong<T = any>() {
        return axios.get<T>(`${this.baseApi}/admin/loai-phong/list`);
    }

    public static addLoaiPhong<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/loai-phong/luu`, body);
    }

    public static deleteLoaiPhong<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}/admin/loai-phong/delete/${id}`);
    }

    public static detailLoaiPhong<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/loai-phong/detail/${id}`);
    }

    public static updateLoaiPhong<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/loai-phong/sua`, body);
    }
    //api thống kê
    public static getBangThongKe<T = any>() {
        return axios.get<T>(`${this.baseApi}/admin/thong-ke/thong-ke-so-luong`);
    }

    ///api loại dịch vụ
    public static locTheoDichVu<T = any>(id: any) {

        return axios.get<T>(`${this.baseApi}/admin/dich-vu/loc-theo-loai-dich-vu/${id ? ('?id=' + id) : ''}`);
    }

    public static getLoaiDichVu<T = any>() {
        return axios.get<T>(`${this.baseApi}/admin/loai-dich-vu/hien-thi`);
    }

    public static addLoaiDichVu<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/loai-dich-vu/add`, body);
    }

    public static updateLoaiDichVu<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/loai-dich-vu/update`, body);
    }

    public static deleteLoaiDichVu<T = any>(id: any) {
        return axios.delete<T>(`${this.baseApi}/admin/loai-dich-vu/delete/${id}`);
    }

    public static detailLoaiDichVu<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/loai-dich-vu/detail/${id}`);
    }


    //api dịch vụ
    public static addDichVu<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/dich-vu/add`, body);
    }

    public static detailDichVu<T = any>(id: any) {
        return axios.get<T>(`${this.baseApi}/admin/dich-vu/detail/${id}`);
    }

    public static updateDichVu<T = any>(body: any) {
        return axios.post<T>(`${this.baseApi}/admin/dich-vu/update`, body);
    }

    //api danh sách phòng

    public static locPhong<T = any>(id: any) {

        return axios.get<T>(`${this.baseApi}/admin/phong/loc/${id ? ('?id=' + id) : ''}`);
    }
}