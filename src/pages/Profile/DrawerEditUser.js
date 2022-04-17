import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../../redux/actions/types/QuanLyNguoiDungType";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function DrawerEditUser(props) {
  //   const [state, setState] = useState({ visible: false });

  const { visible,ComponentContentDrawer,callBackSubmit } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({ type: OPEN_DRAWER });
  };

  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button> */}
      <Drawer
        title="Chỉnh sửa Profile"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
          {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
