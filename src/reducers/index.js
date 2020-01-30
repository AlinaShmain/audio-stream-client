import {combineReducers} from "redux";
import authReducer from './auth_reducer';
import playerReducer from './player_reducer';

export default combineReducers({
   auth: authReducer,
   player: playerReducer
});