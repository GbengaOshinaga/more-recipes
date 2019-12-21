import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';
import reducer, { initialState } from './reducers';
import operations from './operations';

export default function useGlobalStore() {
  const [{ recipes }, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch
  ]);

  const { fetchRecipes } = useMemo(() => operations(actions), [actions]);

  return { recipes, fetchRecipes };
}
