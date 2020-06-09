import {combineReducers} from "redux";
import authReducer from './auth_reducer';
import playerReducer from './player_reducer';
import uiReducer from './ui_reducer';

export default combineReducers({
   auth: authReducer,
   player: playerReducer,
   ui: uiReducer
});