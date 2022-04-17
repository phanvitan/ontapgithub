import { DISPLAY_LOADING, HIDE_LOADING } from "../actions/types/LoadingType";

const stateDefault = {
    isLoading: false
}

export const LoadingReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DISPLAY_LOADING: {
            state.isLoading = true;
            return { ...state }
        };
            break;
        case HIDE_LOADING: {
            state.isLoading = false;
            return { ...state }
        };
            break;

        default:
            return { ...state }

    }
}