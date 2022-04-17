import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio, Space } from 'antd';
import moment from 'moment';
import { NavLink } from 'react-router-dom'

const { TabPane } = Tabs;

// export default function HomeMenu(props) {
//     const [state, setState] = useState({
//         tabPosition: 'left',
//     })

export default class Demo extends React.PureComponent {
    state = {
        tabPosition: 'left',
    };
    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };
    componentDidMount() {

    }

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            let { tabPosition } = this.state;
            return (
                <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width="50" />} key={index}>

                    <Tabs tabPosition={tabPosition}>
                        {heThongRap.lstCumRap?.map((cumRap, index) => {
                            return (
                                <TabPane tab={
                                    <div style={{ width: '300px', display: 'flex' }}>
                                        <img src="https://s3img.vcdn.vn/123phim/2018/10/lotte-cinema-phu-tho-15383865322515.jpg" width="50" />
                                        <br />
                                        <div className="text-left ml-2">
                                            {cumRap.tenCumRap}
                                            <p className="text-red-200">Chi tiết</p>
                                        </div>
                                    </div>
                                }
                                    key={index}>
                                    {/* //load phim tuong ung */}
                                    {cumRap.danhSachPhim.map((phim, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div className="my-5">
                                                    <div style={{ display: 'flex' }}>
                                                        <img style={{ height:75, width:75 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => {
                                                            e.target.onError=null; e.target.src="https://picsum.photos/75/75"
                                                        }} />
                                                        <div className="ml-2">
                                                            <h1 className="text-2xl text-green-700">{phim.tenPhim}</h1>
                                                            <p>{cumRap.diaChi}</p>
                                                            <div className="grid grid-cols-6 gap-6" >
                                                                {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                    return (
                                                                        <NavLink className="text-2xl text-green-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index} >
                                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                        </NavLink>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </Fragment>
                                        )
                                    })}
                                </TabPane>
                            )
                        })}
                    </Tabs>

                </TabPane>
            )
        })
    }

    render() {
        console.log(this.props, 'props123');
        const { tabPosition } = this.state;
        return (
            <>
                <Tabs tabPosition={tabPosition}>
                    {this.renderHeThongRap()}
                </Tabs>
            </>
        );
    }
}
