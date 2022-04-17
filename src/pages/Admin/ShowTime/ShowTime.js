import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Cascader, Select } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { useState } from "react";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content);
      } catch (error) {
        console.log("error", error.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state.heThongRapChieu);

  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (error) {}
  }, []);

  const handleChangeHeThongRap = async (value) => {
    //tu he thong rap call api lay thong tin rap
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      //gan gia tri cum rap vao state.cumRap
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };

  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }

  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onSubmitCapture={formik.handleSubmit}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <h3 className="text-2xl">
              Tạo lịch chiếu - {props.match.params.tenphim}
            </h3>
            <img src={film.hinhAnh} alt="..." width={200} height={200} />
          </div>
          <div className="col-span-10 mt-8">
          
            <Form.Item label="Hệ thống rạp">
              <Select
                ///cach 1
                // options={state.heThongRapChieu?.map((htr, index) => ({
                //   label: htr.tenHeThongRap,
                //   value: htr.tenHeThongRap,
                // }))}
                ///cach 2
                options={convertSelectHTR()}
                onChange={handleChangeHeThongRap}
                placeholder="Chọn hệ thống rạp"
              />
            </Form.Item>
            <Form.Item label="Cụm rạp">
              <Select
                options={state.cumRapChieu?.map((cumRap, index) => ({
                  label: cumRap.tenCumRap,
                  value: cumRap.maCumRap,
                }))}
                onChange={handleChangeCumRap}
                placeholder="Chọn cụm rạp"
              />
            </Form.Item>
            <Form.Item label="Ngày chiếu giờ chiếu">
              <DatePicker
                format="DD/MM/YYYY hh:mm:ss"
                showTime
                onChange={onChangeDate}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="Giá vé">
              <InputNumber
                min={75000}
                max={150000}
                onChange={onChangeInputNumber}
              />
            </Form.Item>
            <Form.Item label="Xong">
              <Button htmlType="submit">Tạo lịch chiếu</Button>
            </Form.Item>
          </div>
        </div>

        

    

       
      </Form>
    </div>
  );
}
