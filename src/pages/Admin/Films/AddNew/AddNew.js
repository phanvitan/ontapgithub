import React, { useState } from "react";
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
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimActions";
import { GROUPID } from "../../../../ulti/settings/config";

const AddNew = () => {
  const [componentSize, setComponentSize] = useState("default");

  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    //   maNhom:GROUPID
    },
    onSubmit: (values) => {
      console.log("values", values);

      //tạo đối tượng formdata => đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      //goi api gửi các giá trị formdata về backend xử lý
      dispatch(themPhimUploadHinhAction(formData));
      //   formData.append('File', formik.values.tenPhim);
      //   formData.append("tenPhim", formik.values.tenPhim);
      //   console.log('formData', formData.get('tenPhim'));
    },
  });

  const handleChangeDatePicker = (value) => {
    // console.log('datepickerchange',moment(value).format('DD/MM/YYYY'));
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    //lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //tao doi tuong de doc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result); //hinh anh theo định dạng base 64 (chuỗi kí tự)
      };
      formik.setFieldValue("hinhAnh", file);
    }
    // console.log("file", file);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Thêm mới phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim" name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>

        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png,image/ipeg,image/gif,image/jpg"
          />
          <br />
          <img width={100} height={100} src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-1 border-4">
            Thêm phim
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;
