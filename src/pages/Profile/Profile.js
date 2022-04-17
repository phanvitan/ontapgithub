import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import _ from "lodash";
import { NavLink } from "react-router-dom";

export default function Profile(props) {
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
    <div className="grid grid-cols-5 py-24">
      <div className="col-span-1 flex flex-col h-full p-3 w-60 bg-coolGray-50 text-coolGray-800">
        <div className="space-y-3">
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
            {/* <NavLink>Thông tin cá nhân</NavLink> */}
              <li className="rounded-sm font-bold">
                <NavLink
                  to="/infoclient"
                  className="flex items-center p-2 space-x-3 rounded-md font-weight-bold"
                >            
                  <span>Thông tin cá nhân</span>
                </NavLink>
              </li>
              <li className="rounded-sm font-bold shadow-sm bg-pink-100">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md font-weight-bold"
                >
                  <span>Lịch sử đặt vé</span>
                </a>
              </li>
             
             
            </ul>
          </div>
        </div>
      </div>

      <div  className="col-span-4">
      
        
          <section className="text-gray-600 body-font">
            {/* < className="container px-5 py-24 mx-auto"> */}
              {/* <div className="flex flex-col text-center w-full mb-20"> */}
                {/* <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1  text-purple-600 ">
                  Lịch sử đặt vé
                </h1> */}
              {/* </div> */}

              <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
            
          </section>
        
      </div>
  
    </div>
    
  );
}
