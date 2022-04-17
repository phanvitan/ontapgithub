import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  withFormik,
} from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { connect } from "react-redux";
import { values } from "lodash";
import * as yup from "yup";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import Axios from "axios";
import { history } from "../../App";

const signupUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("*Field is required!"),
  matKhau: yup.string().required("*Field is required!"),
  hoTen: yup.string().required("*Field is required!"),
  email: yup
    .string()
    .required("*Field is required!")
    .email("* Email is invalid!"),
  soDt: yup
    .string()
    .required("*Field is required!")
    .matches(/^[0-9]+$/),
  maNhom: yup.string().required("*Field is required!"),
});

export default function Register(props) {
  const _handleSubmit = (values) => {
    console.log("values", values);
    quanLyNguoiDungService
      .dangKy(values)
      .then((res) => {
        console.log("res", res);
        if (res.data.statusCode === 200) {
          // history.goBack();
          history.push({ pathname:'/home' });

        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <Formik
      initialValues={{
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: "",
      }}
      validationSchema={signupUserSchema}
      onSubmit={_handleSubmit}
      render={(formikProps) => (
        <Form className="lg:w-1/2 xl:max-w-screen-sm">
          <div>
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
              <div className="cursor-pointer flex items-center">
                <div>
                  <svg
                    className="w-10 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 225 225"
                    style={{ enableBackground: "new 0 0 225 225" }}
                    xmlSpace="preserve"
                  >
                    <style
                      type="text/css"
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                      }}
                    />
                    <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                      <g>
                        <path
                          id="Layer0_0_1_STROKES"
                          className="st0"
                          d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
                  CYBERLEARN
                </div>
              </div>
            </div>

            <div className="text-center mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
              <h2 className="text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
                Đăng ký
              </h2>
            </div>

            {/* <div className="form-group"> */}
            <div className="form-group mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
              <div className="form-group text-sm font-bold text-gray-700 tracking-wide">
                <label>Tài khoản</label>

                <Field
                  type="text"
                  className="form-control w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="taiKhoan"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="taiKhoan">
                  {(msg) => (
                    <div className="alert text-red-500 alert-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group text-sm font-bold text-gray-700 tracking-wide mt-4 flex-row-reverse justify-between">
                <label>Mật khẩu</label>

                <Field
                  type="password"
                  className="form-control w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="matKhau"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="matKhau">
                  {(msg) => (
                    <div className="alert text-red-500 alert-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group text-sm font-bold text-gray-700 tracking-wide mt-4">
                <label>Họ tên</label>

                <Field
                  type="text"
                  className="form-control w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="hoTen"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="hoTen">
                  {(msg) => (
                    <div className="alert text-red-500 alert-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group text-sm font-bold text-gray-700 tracking-wide mt-4">
                <label>Email</label>

                <Field
                  type="email"
                  className="form-control w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="email"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="alert text-red-500 alert-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group text-sm font-bold text-gray-700 tracking-wide mt-4">
                <label>Số điện thoại</label>

                <Field
                  type="text"
                  className="form-control w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="soDt"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="soDt">
                  {(msg) => (
                    <div className="alert text-red-500 alert-danger">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group text-sm font-bold text-gray-700 tracking-wide mt-4">
                <label>Mã nhóm</label>
                <Field
                  component="select"
                  className="form-control w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="maNhom"
                  onChange={formikProps.handleChange}
                >
                  <option>GP01</option>
                  <option>GP02</option>
                  <option>GP03</option>
                  <option>GP04</option>
                  <option>GP05</option>
                  <option>GP06</option>
                  <option>GP07</option>
                  <option>GP08</option>
                  <option>GP09</option>
                  <option>GP10</option>
                </Field>
                <ErrorMessage name="maNhom" />
              </div>
            </div>

            <div
              type="submit"
              className="text-center form-group text-sm font-bold text-gray-700 mt-4 justify-center"
            >
              <button
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4  rounded-full font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg justify-center"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </Form>
      )}
    />
  );
}
