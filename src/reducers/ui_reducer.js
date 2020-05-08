import * as types from '../constants/action_constants';

const initialState = {
    offset_y_search: 0,
    width_menu: 0
};

export default function ui(state=initialState, action) {
    switch(action.type) {
        case types.CHANGE_SEARCH_Y:
            return {...state, offset_y_search: action.offsetY};
        case types.CHANGE_MENU_WIDTH:
            return {...state, width_menu: action.width};
        default:
            return state;
    }
};