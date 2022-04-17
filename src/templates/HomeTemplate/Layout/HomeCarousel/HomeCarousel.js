import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";
import axios from "axios";

const contentStyle = {
  // height: "200px",
  color: "#fff",
  lineHeight: "0px",
  textAlign: "center !important",
  backgroundPosition: "center !important",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat !important" ,
  // height: "90%",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  console.log("arrImg", arrImg);

  const dispatch = useDispatch();

  /*
  se tu kich hoat khi component load ra
  useEffect(async () => {
    try {
      const result = await axios({
        url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
        method: 'GET'
      });
      //dua len reducer
      console.log('result', result);
      dispatch({
        type: 'SET_CAROUSEL',
        arrImg: result.data.content
      })
    } catch (errors) {
      console.log('errors', errors)
    }
  }, [])
  ****/

  ///CACH 2:
  useEffect(() => {
    ///CACH 1 : viet chi tiet
    // const action = getCarouselAction();
    // dispatch(action);

    ///CACH 2: viet ngan gon
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} />
          </div>
        </div>
      );
    });
  };

  return (
    <Carousel effect="fade" >
      {renderImg()}
    </Carousel>
  );
}
