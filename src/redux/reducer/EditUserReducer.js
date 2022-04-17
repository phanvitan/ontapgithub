import { EDIT_USER, UPDATE_USER, UPDATE_USER_CLIENT } from "../actions/types/QuanLyNguoiDungType";

const initialState = {
  userEdit: {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "",
    maLoaiNguoiDung:'',
    hoTen: "",
  },
};

export const EditUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER: {
      state.userEdit = action.userEditModel;
      console.log("ab", action.userEditModel);
      return { ...state };
    }
    case UPDATE_USER : {
      state.userEdit = action.userEdit;
      return{...state}
    }
    default:
      return state;
  }
};
