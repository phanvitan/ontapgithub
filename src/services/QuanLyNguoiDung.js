import { baseService } from "./baseService";
import { GROUPID } from "../ulti/settings/config";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    //gom co : taiKhoan ; matKhau
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  dangKy = (values) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`,values);
  };
  updateUser = (valuesUpdate) => {
    return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,valuesUpdate);
  };
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();
