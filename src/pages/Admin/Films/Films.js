import React, { useEffect } from "react";

import { Table, Button } from "antd";
import { Input, Space } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimActions";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const { Search } = Input;

export default function Films() {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  console.log("arrFilmDefault", arrFilmDefault);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + " ..."
              : film.moTa}
          </Fragment>
        );
      },
      width: "35%",
    },
    {
      title: "Chỉnh sửa/ Xóa phim",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/films/edit/${film.maPhim}`}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="mr-2 text-2xl"
              onClick={() => {
                //goi action xoa
                if (
                  window.confirm("Bạn có chắc muốn xóa phim" + film.tenPhim)
                ) {
                  ///goi action
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem('filmParams',JSON.stringify(film));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />{" "}
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
  ];

  const data = arrFilmDefault;

  const onSearch = (value) =>{
    console.log(value);
    //goi api layDanhSachPhim
    dispatch(layDanhSachPhimAction(value));
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3 className="text-3xl">Quản lý phim</h3>
      <Button className="mb-2">Thêm phim</Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />

      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
