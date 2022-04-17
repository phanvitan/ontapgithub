import {applyMiddleware,combineReducers,createStore} from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducer/CarouselReducer';
import { DrawerReducer } from './reducer/DrawerReducer';
import { EditUserReducer } from './reducer/EditUserReducer';
import { LoadingReducer } from './reducer/LoadingReducer';
import { QuanLyDatVeReducer } from './reducer/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducer/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducer/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducer/QuanLyRapReducer';

const rootReducer = combineReducers({
    ///state ung dung
    CarouselReducer,QuanLyPhimReducer,QuanLyRapReducer,QuanLyNguoiDungReducer,QuanLyDatVeReducer,LoadingReducer,DrawerReducer,EditUserReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk))