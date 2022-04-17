import axios from 'axios'
import { quanLyPhimService} from '../../services/QuanLyPhimService';
import { DOMAIN } from '../../ulti/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
///CACH 1
// export const getCarouselAction = () => {
//     return dispatch =>{
//     }
// } 

///CACH 2:
export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url:`${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
            //     method: 'GET'
              //SU DUNG THAM SO
              const result = await quanLyPhimService.layDanhSachBanner();
            dispatch({
                type:SET_CAROUSEL,
                arrImg: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}




