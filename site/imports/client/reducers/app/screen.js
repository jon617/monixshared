// sets the dimensions of the browser window
import { SCREEN } from '../../actions/types';

const w = window;
const d = document;
const documentElement = d.documentElement;
const body = d.getElementsByTagName("body")[0];
const width =  w.innerWidth || documentElement.clientWidth || body.clientWidth;
const height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

const DEFAULT_STATE = {
  width: width,
  height: height,
};

export default ( state = DEFAULT_STATE, action ) => {
  switch (action.type) {
    case SCREEN: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
