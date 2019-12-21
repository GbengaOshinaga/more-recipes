import { SAVE_RECIPES } from './actionCreators';

export const initialState = {
  recipes: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_RECIPES:
      return { recipes: action.payload };
    default:
      return state;
  }
};

export default reducer;
