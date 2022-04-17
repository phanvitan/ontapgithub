import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  EDIT_USER,
  SET_SUBMIT_EDIT_USER,
  UPDATE_USER,
} from "../../redux/actions/types/QuanLyNguoiDungType";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateUserAction } from "../../redux/actions/QuanLyNguoiDungAction";

function FormEditUser(props) {

  const { values, handleChange, handleSubmit } = props;

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch({
      type: SET_SUBMIT_EDIT_USER,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <table className="w-full px-3 mr-5 border mt-6">
        <thead>
          <tr className="border-b bg-pink-100">
            <th className="p-2 border-r cursor-pointer text-sm font-semibold text-blue-800">
              <div className="flex items-center justify-center">STT</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-semibold text-blue-800">
              <div className="flex items-center justify-center">Nội Dung</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
            <td className="p-2 border-r">Tên tài khoản</td>
            <td>
              <input
                value={values.taiKhoan}
                className="form-control w-full bg-gray-100 text-center px-8 font-extrabold"
                name="taiKhoan"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
            <td className="p-2 border-r">Họ tên</td>
            <td>
              <input
                value={values.hoTen}
                className="form-control w-full bg-gray-100 text-center px-8 font-extrabold"
                name="hoTen"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
            <td className="p-2 border-r">Email</td>
            <td>
              <input
                value={values.email}
                className="form-control w-full bg-gray-100 text-center px-8 font-extrabold"
                name="email"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
            <td className="p-2 border-r">Số điện thoại</td>
            <td>
              <input
                value={values.soDT}
                className="form-control w-full bg-gray-100 text-center px-8 font-extrabold"
                name="soDt"
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

const EditUserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;
    return {
      taiKhoan: userEdit.taiKhoan,
      matKhau:userEdit.matKhau,
      soDT: userEdit.soDT,
      hoTen: userEdit.hoTen,
      email: userEdit.email,
      maNhom:userEdit.maNhom,
      maLoaiNguoiDung: userEdit.maLoaiNguoiDung
    };
  },
  // validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values);
    // props.dispatch({
    //   type: UPDATE_USER,
    //   valuesUpdate: values,
    // });
  props.dispatch(updateUserAction(values));
  },
  displayName: "EditUserForm",
})(FormEditUser);

const mapStateToProps = (state) => ({
  userEdit: state.QuanLyNguoiDungReducer.userEdit,
});
export default connect(mapStateToProps)(EditUserForm);
