import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../component/Film/Film';
import MultipleRowSlick from '../../component/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

export default function Home(props) {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    console.log('propsHome', arrFilm)
    //props.match.params

    // const renderFilms = () => {
    //     return arrFilm.map((phim, index) => {
    //         return (
    //             <Film key={index} />
    //         )
    //     })
    // }

    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action); //dispatch 1 funtion tu redux thunk

        dispatch(layDanhSachHeThongRapAction());

    }, [])

    return (
        <div>
            <HomeCarousel/>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilm={arrFilm} />
                    {/* <div className="flex flex-wrap" style={{ justifyContent: 'center' }}>
                        {renderFilms()}
                    </div> */}
                </div>
            </section>
            <div className="mx-36" >
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>

        </div>
    )
}
