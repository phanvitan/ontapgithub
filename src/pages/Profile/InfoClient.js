import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import _, { result, values } from "lodash";
import {
  EDIT_USER,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_USER,
  SET_SUBMIT_EDIT_USER,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG_UPDATE,
  UPDATE_USER,
  UPDATE_USER_CLIENT,
} from "../../redux/actions/types/QuanLyNguoiDungType";
import FormEditUser from "./FormEditUser";

import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateUserAction } from "../../redux/actions/QuanLyNguoiDungAction";

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { useFormik } from "formik";

export default function InfoClient(props){


  const {Component, ...restProps} = props;

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  console.log('userlogin',userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_THONG_TIN_NGUOI_DUNG,
    });
    console.log('object',result);
  }, [])

  return (
    <div className="grid grid-cols-5 py-24 mr-4">
      <div className="col-span-1  h-full p-3 bg-coolGray-50 text-coolGray-800">
        <div className="space-y-3">
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm font-bold shadow-sm bg-pink-100">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md font-weight-bold"
                >
                  <span>Thông tin cá nhân</span>
                </a>
              </li>
              <li className="rounded-sm font-bold">
                <NavLink
                  to="/profile"
                  className="flex items-center p-2 space-x-3 rounded-md font-weight-bold"
                >
                  <span>Lịch sử đặt vé</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-4">

        <table className="w-full px-3 mr-5 border mt-6">
          <thead>
            <tr className="border-b bg-pink-100">
              <th className="p-2 border-r cursor-pointer text-sm font-semibold text-blue-800">
                <div className="flex items-center justify-center">STT</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-semibold text-blue-800">
                <div className="flex items-center justify-center">Nội Dung</div>
              </th>

              <th className="p-2 border-r cursor-pointer text-sm font-semibold text-blue-800">
                <div className="flex items-center justify-center">
                  Chỉnh sửa
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
              <td className="p-2 border-r">Tên tài khoản</td>
              <td className="p-2 border-r">{userLogin.taiKhoan}</td>

              <td>
                <a
                  href="#"
                  className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin" onClick={() => {
                    const action = {
                      type: OPEN_FORM_EDIT_USER,
                      Component: <FormEditUser />,
                    };
                    dispatch(action);
                    const actionEditUser = {
                      type: EDIT_USER,
                      userEditModel: userLogin,
                    };
                    dispatch(actionEditUser);
                  }}
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
              <td className="p-2 border-r">Họ tên</td>
              <td className="p-2 border-r">{userLogin.hoTen}</td>

              <td>
                <a
                  href="#"
                  className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin" onClick={() => {
                    const action = {
                      type: OPEN_FORM_EDIT_USER,
                      Component: <FormEditUser />,
                    };
                    dispatch(action);
                    const actionEditUser = {
                      type: EDIT_USER,
                      // userEditModel: userLogin,
                    };
                    dispatch(actionEditUser);
                  }}
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
              <td className="p-2 border-r">Email</td>
              <td className="p-2 border-r">{userLogin.email}</td>

              <td>
                <a
                  href="#"
                  className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin" onClick={() => {
                    const action = {
                      type: OPEN_FORM_EDIT_USER,
                      Component: <FormEditUser />,
                    };
                    dispatch(action);
                    const actionEditUser = {
                      type: EDIT_USER,
                      userEditModel: userLogin,
                    };
                    dispatch(actionEditUser);
                  }}
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
              <td className="p-2 border-r">Số điện thoại</td>
              <td className="p-2 border-r">{userLogin.soDT}</td>

              <td>
                <a
                  href="#"
                  className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                  onClick={() => {
                    const action = {
                      type: OPEN_FORM_EDIT_USER,
                      Component: <FormEditUser />,
                    };
                    dispatch(action);
                    const actionEditUser = {
                      type: EDIT_USER,
                      userEditModel: userLogin,
                    };
                    dispatch(actionEditUser);
                  }}
                >
                  Edit
                </a>
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  );
}
