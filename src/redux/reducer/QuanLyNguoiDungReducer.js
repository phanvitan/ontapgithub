import { values } from "lodash";
import { TOKEN, USER_LOGIN } from "../../ulti/settings/config";
import {
    CLOSE_DRAWER,
  DANG_KY_ACTION,
  DANG_NHAP_ACTION,
  EDIT_USER,
  OPEN_DRAWER,
  SET_THONG_TIN_NGUOI_DUNG,
  UPDATE_USER,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: {},
  visible: false,
  title: "",
  ComponentContentDrawer: <p>default content</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo");
  },
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }
    case EDIT_USER: {
      state.userEdit = action.userEditModel;
      console.log("ab", action.userEditModel);
      return { ...state };
    }
    // case UPDATE_USER:{
    //   state.userLogin = action.valuesUpdate;
    //   console.log("777", action.valuesUpdate);
    //   return { ...state};
    // }
    // case OPEN_DRAWER:
    //   return { ...state, visible: true };
    // case CLOSE_DRAWER:
    //   return { ...state, visible: false };
    default:
      return { ...state };
  }
};
