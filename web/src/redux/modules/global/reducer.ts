import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const globalState: GlobalState = {
	token: "",
};

const global = (state: GlobalState = globalState, action: AnyAction) => 
  produce(state, draftState => {
    switch(action.type) {
      case types.SET_TOKEN:
        console.log('reducer token');
        draftState.token = action.token;
				break;
      default:
        return draftState;
    } 
  })

export default global;