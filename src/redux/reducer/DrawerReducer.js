import React from "react";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_USER,
  SET_SUBMIT_EDIT_USER,
} from "../actions/types/QuanLyNguoiDungType";

const initialState = {
  visible: false,
  ComponentContentDrawer: <p>default content</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo");
  },
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_FORM_EDIT_USER: {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case SET_SUBMIT_EDIT_USER: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    default:
      return state;
  }
};
