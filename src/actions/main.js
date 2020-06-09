import * as types from '../constants/action_constants';

export const changeSearchY = (offsetY) => ({
    type: types.CHANGE_SEARCH_Y,
    offsetY
});

export const changeMenuWidth = (width) => ({
    type: types.CHANGE_MENU_WIDTH,
    width
});