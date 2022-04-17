import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
    arrFilm: [
        {
            "maPhim": 8554,
            "tenPhim": "Tây Du Ký Hiện Đại 12",
            "biDanh": "tay-du-ky-hien-dai-12",
            "trailer": "https://www.youtube.com/watch?v=DSbqlb_NSNI",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/tay-du-ky-hien-dai_gp00.jpg",
            "moTa": "Đây là bộ phim kể về hành trình đi tây trúc thỉnh kinh của 4 thầy trò đường tăng. Cốt chuyện hấp dẫn",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2021-11-25T18:14:47.387",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        },
        {
            "maPhim": 8554,
            "tenPhim": "Tây Du Ký Hiện Đại 12",
            "biDanh": "tay-du-ky-hien-dai-12",
            "trailer": "https://www.youtube.com/watch?v=DSbqlb_NSNI",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/tay-du-ky-hien-dai_gp00.jpg",
            "moTa": "Đây là bộ phim kể về hành trình đi tây trúc thỉnh kinh của 4 thầy trò đường tăng. Cốt chuyện hấp dẫn",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2021-11-25T18:14:47.387",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        },
    ],
    dangChieu: true,
    sapChieu: true,
    arrFilmDefault: [],
    filmDetail:{},
    thongTinPhim:{}
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm;
            return { ...state }
        }
        case SET_FILM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu);
            return { ...state }
        }
        case SET_FILM_SAP_CHIEU: {
            state.sapChieu = !state.sapChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu);
            return { ...state }
        }
        case SET_CHI_TIET_PHIM:{
            state.filmDetail=action.filmDetail;
            return {...state}
        }
        case SET_THONG_TIN_PHIM:{
            state.thongTinPhim=action.thongTinPhim;
            return {...state}
        }
        default: return { ...state }
    }
}