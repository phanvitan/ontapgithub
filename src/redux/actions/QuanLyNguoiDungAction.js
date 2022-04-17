import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  DANG_KY_ACTION,
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
  UPDATE_USER,
} from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
import { values } from "lodash";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        /// ===200 tuc la dang nhap thanh cong,  xem trang api de biet chi tiet.
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        ///chuyen huong dang nhap ve trang truoc do
        history.goBack();
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        /// ===200 tuc la dang nhap thanh cong,  xem trang api de biet chi tiet.
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};
export const updateUserAction = (valuesUpdate) => {
  console.log('action123',valuesUpdate);
  // return;
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.updateUser(valuesUpdate);
      alert("Update user thành công!");
      console.log("result", result.data.content);
      if (result.data.statusCode === 200) {
        dispatch(layThongTinNguoiDungAction());
        history.goBack();
      }
      console.log("result", result);
    } catch (errors) {
      console.log("error", errors.response?.data);
    }
  };
};
