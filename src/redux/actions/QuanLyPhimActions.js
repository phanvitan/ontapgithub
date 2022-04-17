import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from "../../App";

export const layDanhSachPhimAction = (tenPhim='') => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      //sau khi lay du lieu tu api ve, dua len redux(reducer)
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công!");
      console.log("result", result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công!");
      console.log("result", result.data.content);
      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      console.log('result',result.data.content)
      alert("Xóa phim thành công!");
      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
