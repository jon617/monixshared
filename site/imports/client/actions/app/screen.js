// sets the browser window width/height dimensions
import { SCREEN } from '../types';

const setScreen = ( data ) => {
  return {
    type: SCREEN,
    payload: data,
  };
};

export default setScreen;
