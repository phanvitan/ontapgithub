import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datGheAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeActions";
import style from "./Checkout.module.css";
import {
  CheckOutlined,
  CloseOutlined,
  CloudOutlined,
  SmileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./Checkout.css";
import { CHUYEN_TAB, DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { datVeAction } from "../../redux/actions/QuanLyDatVeActions";

import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import { connection } from "../../index";
import { history } from "../../App";
import { NavLink } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../ulti/settings/config";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();
  console.log("danhSachGheDangDat", danhSachGheDangDat);

  useEffect(() => {
    //goi ham tao ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    //dispatch funtion nay di
    dispatch(action);

    ///co 1 client nao thuc hien dat ve thanh cong thi minh se load lai danh sach phong ve cua lich chieu do
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });

    //vua vao trang, load tat ca ghe cua nguoi khac dang dat
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //load danh sach ghe dang dat tu serve ve
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);
      //buoc 1: loai minh ra khoi danh sach
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      //buoc 2: gop danh sach ghe khach dat o tat ca user thanh 1 mang chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe];
      }, []);
      //dung ''uniqBy'' de loai bo cac maGhe trung nhau
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
      // console.log('arrGheKhachDat',arrGheKhachDat);

      //dua du lieu ghe khach dat cap nhat redux
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
    });

    //cai dat su kien khi reload trang
    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };

  console.log("chiTietPhongVe", chiTietPhongVe);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      //kiem tra tung ghe render xem co trong mang ghe dang dat hay khong
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      //kiem tra tung render xem co phai ghe khach dat hay khong
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD != -1) {
        classGheKhachDat = "gheKhachDat";
      }
      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      if (indexGheDD != -1) {
        classGheDaDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              // const action = datGheAction(ghe, props.match.params.id);
              // dispatch(action);
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`}
            key={index}
          >
            {ghe.daDat ? (
              classGheDaDuocDat != "" ? (
                <CloudOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black font-bold text-xl">Màn hình</h3>
            </div>
            <div>{renderSeats()}</div>
          </div>

          <div className="mt-5 flex justify-center">
            <table className=" divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế mình đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ml-8">
                <tr>
                  <td>
                    <button className="ghe text-center ">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          {/* <h3 className="text-green-400 text-center text-2xl">0 đ</h3>
                    <hr /> */}
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>
            {thongTinPhim.tenCumRap}-{thongTinPhim.tenRap}
          </p>
          <p>Ngay chieu: {thongTinPhim.ngayChieu}</p>

          {/* cach cua thay Khai */}
          {/* <hr />
                    <div className="flex flex-row my-5" >
                        <div className="w-4/5">
                            <span className="text-red-400 text-lg">Ghế : </span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return (
                                    <span key={index} className="text-green-500 text-xl">
                                        * {gheDD.stt}__{gheDD.giaVe.toLocaleString()}<br />
                                    </span>
                                )
                            })}
                        </div>
                        <div>
                            <div className="mb-1">
                                <span className="text-green-800 text-lg">{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()}</span>
                            </div>
                        </div>

                    </div>
 */}

          {/* cach cua mr Tan - da them table  */}

          <div className="border-b border-gray-200 shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 ml-0 py-2 text-sm text-gray-500">
                    Số ghế
                  </th>
                  <th className="px-6 py-2 text-sm text-gray-500"></th>
                  <th className="px-6 py-2 text-sm text-gray-500"></th>
                  <th className="px-6 py-2 text-sm text-gray-500">Đơn giá</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="whitespace-nowrap">
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {_.sortBy(danhSachGheDangDat, ["stt"]).map(
                      (gheDD, index) => {
                        return (
                          <span key={index} className="text-green-500 text-sm">
                            {gheDD.stt}
                            <br />
                          </span>
                        );
                      }
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-red-500 font-bold"></td>
                  <td className="px-6 py-4 text-sm text-red-500 font-bold"></td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500">
                      {_.sortBy(danhSachGheDangDat, ["stt"]).map(
                        (gheDD, index) => {
                          return (
                            <span
                              key={index}
                              className="text-green-150 text-sm"
                            >
                              {gheDD.giaVe.toLocaleString()}
                              <br />
                            </span>
                          );
                        }
                      )}
                    </div>
                  </td>
                </tr>
                <tr className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-red-500 font-bold">
                    Tổng tiền
                  </td>
                  <td className="px-6 py-4 text-sm text-red-500 font-bold"></td>
                  <td className="px-6 py-4 text-sm text-red-500 font-bold"></td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-red-900">
                      <span className="text-green-1400 text-sm">
                        {danhSachGheDangDat
                          .reduce((tongTien, ghe, index) => {
                            return (tongTien += ghe.giaVe);
                          }, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div
            className="mb-0 h-full flex flex-col items-center"
            style={{ marginBottom: 0 }}
          >
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                console.log("ttdv", thongTinDatVe);

                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;

export default function CheckoutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  console.log("tabActive", tabActive);

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    return () => {
      dispatch({
        type: "CHANGE_TAB_ACTIVE",
        number: "2",
      });
    };
  }, []);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          {" "}
          <button
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            Hello ! {userLogin.taiKhoan}
          </button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  /****
   * const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <button
            onClick={() => {
              history.push("/profile");
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="ml-5 rounded-full bg-red-200"
            >
              {" "}
              {userLogin.taiKhoan.substr(0, 1)}{" "}
            </div>
            Hello ! {userLogin.taiKhoan}{" "}
          </button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
   * 
   * 
   * 
   *
   *
   *
   *
   */

  return (
    <div className="p-5">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: "CHANGE_TAB_ACTIVE",
            number: key.toString(),
          });
        }}
      >
        <TabPane
          tab={
            <NavLink className="ml-8" to="/" key="2">
              <HomeOutlined style={{ fontSize: "24" }} className="ml-16" />
            </NavLink>
          }
        ></TabPane>
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="3">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

// function KetQuaDatVe(props) {
//     const dispatch = useDispatch();
//     const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
//     const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

//     useEffect(() => {
//         const action = layThongTinNguoiDungAction();
//         dispatch(action)
//     }, [])

//     console.log('thongTinNguoiDung', thongTinNguoiDung);

//     const renderTicketItem = function () {
//         return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
//             const seats = _.first(ticket.danhSachGhe);
//             return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
//                 <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//                     <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
//                     <div className="flex-grow">
//                         <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
//                         <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY')}</p>
//                         <p>Địa điểm: {seats.tenHeThongRap} </p>
//                         <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
//                     </div>
//                 </div>
//             </div>
//         })
//     }

//     return (
//         <div className="p-5">
//             <section className="text-gray-600 body-font">
//                 <div className="container px-5 py-24 mx-auto">
//                     <div className="flex flex-col text-center w-full mb-20">
//                         <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">Lịch sử đặt vé khách hàng</h1>
//                         <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Chúc quý khách xem phim vui vẻ nhé!</p>
//                     </div>
//                     <div className="flex flex-wrap -m-2">
//                         {renderTicketItem()}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  console.log("thongTinNguoiDung", thongTinNguoiDung);

  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);

      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-pink-500 title-font font-medium text-2xl">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                <span className="font-bold">Giờ chiếu:</span>{" "}
                {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                <span className="font-bold">Ngày chiếu:</span>{" "}
                {moment(ticket.ngayDat).format("DD-MM-YYYY")} .
              </p>
              <p>
                <span className="font-bold">Địa điểm:</span>{" "}
                {seats.tenHeThongRap}{" "}
              </p>
              <p>
                <span className="font-bold">Tên rạp:</span> {seats.tenCumRap} -{" "}
                <span className="font-bold">Ghế:</span>{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-green-500 text-xl" key={index}>
                      {" "}
                      [ {ghe.tenGhe} ]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn nhé !
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {renderTicketItem()}
            {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Lật mặt 48h</h2>
                                <p className="text-gray-500">10:20 Rạp 5, Hệ thống rạp cinestar bhd </p>
                            </div>
                        </div>
                    </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
